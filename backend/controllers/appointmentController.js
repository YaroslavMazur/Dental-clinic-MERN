const ApiErrors = require("../exceptions/apiErrors");
const userModel = require("../models/userModel");
const appointmentService = require("../service/appointmentService");

class appointmentController{
    async addAppointment(req, res, next){
        try{
            console.log(req);
            const {userId, doctorId, appointmentDate} = req.body;

            const appointmentData = await appointmentService.addAppointment(userId, doctorId, appointmentDate);
            const user = await userModel.findOne({_id:userId});
            const doctor = await userModel.findOne({_id:doctorId});

            appointmentService.createEvent(user.email, new Date());
            appointmentService.createEvent(doctor.email, new Date()); //заглушка

            res.json(appointmentData);
           
        }
        catch(err){

            next(err);
        }
    }

    
}

module.exports = new appointmentController();