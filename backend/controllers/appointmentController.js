const ApiErrors = require("../exceptions/apiErrors");
const userModel = require("../models/userModel");
const appointmentService = require("../service/appointmentService");

class appointmentController{
    async addAppointment(req, res, next){
        try{
            console.log(req.body);
            const {user, doctor, date, description} = req.body;

            const appointmentData = await appointmentService.addAppointment(user.id, doctor.id, date);

            appointmentService.createEvent(date, doctor, user, description); 


            res.json(appointmentData);
           
        }
        catch(err){

            next(err);
        }
    }

    
}

module.exports = new appointmentController();