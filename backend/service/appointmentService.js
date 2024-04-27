require("dotenv").config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const appointmentModel = require("../models/appointmentModel");
const tokenModel = require("../models/tokenModel");
const userService = require("./userService");
const userModel = require("../models/userModel");
const ApiErrors = require("../exceptions/apiErrors");
const UserDTO = require("../dtos/userDTO");



const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
});

class appointmentServise {

    async addAppointment(userId, doctorId, appointmentDate, description) {

        const newAppointment = await appointmentModel.create({ userId, doctorId, appointmentDate, description });

        return newAppointment;
    }

    async createEvent(appointmentDate, doctorId, userId, description) {

        const user = await userModel.findOne({ _id: userId });
        const doctor = await userModel.findOne({ _id: doctorId });


        const startDate = new Date(appointmentDate);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);



        const tokensFromDB = await tokenModel.findOne({ user: doctorId });
        oauth2Client.setCredentials({ refresh_token: tokensFromDB.googleRefreshToken });

        if (!this.checkIfAvaliableHour(appointmentDate, endDate, tokensFromDB.googleRefreshToken)) {
            throw ApiErrors.BadRequest("This time is not avaliable", [{ path: "time", msg: "This time is not avaliable" }]);
        }

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: 'Запис до лікаря',
                description: description,
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: 'Europe/Kiev',
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: 'Europe/Kiev',
                },

                attendees: [
                    { email: doctor.email },
                    { email: user.email },
                ],
                sendNotifications: true
            }
        })

        return response.data;

    }

    async getAvaliableHours(doctorId, date) {
        const tokensFromDB = await tokenModel.findOne({ user: doctorId });
        oauth2Client.setCredentials({ refresh_token: tokensFromDB.googleRefreshToken });//може не бути !додати перевірку

        const timeMin = new Date(date);
        timeMin.setHours(9, 0, 0, 0);
        timeMin.setMinutes(0);

        const timeMax = new Date(date);
        timeMax.setHours(18, 0, 0, 0);
        timeMax.setMinutes(0);



        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: 'UTC',
                items: [
                    { id: "primary" }
                ]
            }
        })

        console.log(response.data);
        const busyTime = response.data.calendars["primary"].busy;
        console.log("busy", busyTime)

        let freeTime = [];
        let currentTime = new Date(timeMin);

        let indexTime = 0;

        while (currentTime < timeMax) {
            let endTime = new Date(currentTime);
            endTime.setHours(currentTime.getHours() + 1);

            if (indexTime < busyTime.length) {
                let busyStart = new Date(busyTime[indexTime].start);
                let busyEnd = new Date(busyTime[indexTime].end);

                if (currentTime < busyStart && endTime <= busyStart) {
                    freeTime.push({
                        start: new Date(currentTime),
                        end: new Date(endTime)
                    });

                    currentTime = endTime;
                } else {
                    currentTime = busyEnd;
                    indexTime++;
                }
            } else {
                freeTime.push({
                    start: new Date(currentTime),
                    end: new Date(endTime)
                });
                currentTime = endTime;
            }
        }

        console.log("freetime", freeTime);


        return freeTime;


    }
    
    async checkIfAvaliableHour(timeMin, timeMax, googleRefreshToken) {
        timeMax = new Date(timeMax);
        timeMin = new Date(timeMin);

        oauth2Client.setCredentials({ refresh_token: googleRefreshToken });

        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: 'UTC',
                items: [
                    { id: "primary" }
                ]
            }
        })
        const busyTime = response.data.calendars["primary"].busy;

        if (busyTime.length !== 0) {
            return false;
        }

        return true;
    }

    async getAllAppointments(userId){

        const appointments = await appointmentModel.find({userId:userId}).populate("userId").populate("doctorId");

        appointments.forEach((appointment)=>{

            appointment.userId = new UserDTO(appointment.userId);
            appointment.doctorId = new UserDTO(appointment.doctorId);
            
        })


        console.log(appointments);

        return appointments;
    }


}

module.exports = new appointmentServise();