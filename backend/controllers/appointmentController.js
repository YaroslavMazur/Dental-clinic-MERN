const ApiErrors = require("../exceptions/apiErrors");
const userModel = require("../models/userModel");
const appointmentService = require("../service/appointmentService");

class appointmentController {
    async addAppointment(req, res, next) {
        try {
            console.log(req.body);
            const { userId, doctorId, date, time, description } = req.body;
            const appointmentDataDB = await appointmentService.addAppointment(userId, doctorId, time, description);

            appointmentService.createEvent(time, doctorId, userId, description);


            res.json(appointmentDataDB);

        }
        catch (err) {

            next(err);
        }

    }
    async getAvaliableHours(req, res, next){
        try {
            const {doctorId, date} = req.query;
            const avaliableHours = await appointmentService.getAvaliableHours(doctorId, date);

            console.log(avaliableHours)
            res.json(avaliableHours);

        } catch (err) {
            console.log("Get avaliable hours error", err)
            next(err)
        }
    }

    async getAllAppointmants(req, res, next){
        try{

            const {userId} = req.query;
            
            const allAppointmants = await appointmentService.getAllAppointmants(userId);
            
            console.log("QUERY", userId);
            res.json(allAppointmants);
        }catch(err){
            console.log("Get all appointmants error", err)
            next(err)
        }


    }



}

module.exports = new appointmentController();