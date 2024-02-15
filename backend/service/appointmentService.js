require("dotenv").config();
const {google} = require('googleapis');

const appointmentModel = require("../models/appointmentModel");


const calendar = google.calendar({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  }),
});

class appointmentServise {

    async addAppointment(userId, doctorId, appointmenDate) {

        const newAppointment = await appointmentModel.create({ userId, doctorId, appointmenDate });

        return newAppointment;
    }

    async createEvent(appointmenDate) {
        try {
            const startDate = new Date();
            const endDate = new Date(startDate)
            endDate.setHours(startDate.setHours() + 3);

            const response = await calendar.events.insert({
                calendarId: "primary",
                requestBody: {
                    summary: 'Запис до лікаря', // назва події
                    description: 'Консультація з лікарем', // опис події
                    start: {
                        dateTime: startDate.toISOString(), // початок події
                        timeZone: 'Europe/Kiev', // часовий пояс
                    },
                    end: {
                        dateTime: endDate.toISOString(), // кінець події
                        timeZone: 'Europe/Kiev', // часовий пояс
                    },
                },
            });
            console.log('Подія була успішно створена:', response.data.htmlLink);
        } catch (error) {
            console.error('Сталася помилка при створенні події:', error);
        }

    }


    //   // Створення події у календарі користувача
    //   createEvent(userEmailAddress, eventDetails);

    //   // Створення події у календарі лікаря
    //   createEvent(doctorEmailAddress, eventDetails);

}

module.exports = new appointmentServise();