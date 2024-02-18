require("dotenv").config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const appointmentModel = require("../models/appointmentModel");
const tokenModel = require("../models/tokenModel");
const userService = require("./userService");
const userModel = require("../models/userModel");

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

    async addAppointment(userId, doctorId, appointmenDate, description) {

        const newAppointment = await appointmentModel.create({ userId, doctorId, appointmenDate, description });

        return newAppointment;
    }

    async createEvent(appointmenDate, doctorId, userId, description) {

        const user = await userModel.findOne({ _id: userId });
        const doctor = await userModel.findOne({ _id: doctorId });


        const startDate = new Date(appointmenDate);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);

        const tokensFromDB = await tokenModel.findOne({ user: doctorId });
        oauth2Client.setCredentials({ refresh_token: tokensFromDB.googleRefreshToken });

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
                timeMin: timeMin.toISOString(), // Перетворення в формат ISO
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
                // } else if (currentTime >= busyEnd) {
                //     indexTime++;
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


}

module.exports = new appointmentServise();