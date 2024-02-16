require("dotenv").config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const appointmentModel = require("../models/appointmentModel");
const tokenModel = require("../models/tokenModel");

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

    async addAppointment(userId, doctorId, appointmenDate) {

        const newAppointment = await appointmentModel.create({ userId, doctorId, appointmenDate });

        return newAppointment;
    }

    async createEvent(appointmenDate, doctor, user, description) {
        try {
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);

            const tokensFromDB = await tokenModel.findOne({user:doctor.id});
            oauth2Client.setCredentials({refresh_token:tokensFromDB.googleRefreshToken});

            const response = await calendar.events.insert({
                calendarId: "primary",
                requestBody: {
                    summary: 'Запис до лікаря' , 
                    description: description, 
                    start: {
                        dateTime: startDate.toISOString(), 
                        timeZone: 'Europe/Kiev', 
                    },
                    end: {
                        dateTime: endDate.toISOString(), 
                        timeZone: 'Europe/Kiev', 
                    },

                    attendees:[
                        {email:doctor.email},
                        {email:user.email},
                    ],
                    sendNotifications: true
                },
            });
            console.log('Подія була успішно створена:', response.data.htmlLink);
        } catch (error) {
            console.error('Сталася помилка при створенні події:', error);
        }

    }



}

module.exports = new appointmentServise();