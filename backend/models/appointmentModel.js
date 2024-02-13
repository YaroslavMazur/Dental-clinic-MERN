
const {Schema, model} = require('mongoose');

const AppointmenSchema = new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    
    doctorId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    
    serviceTypeId:{
        type:Schema.Types.ObjectId,
        ref:"ServiceType",
    },

    appointmenDate:{
        required:true,
        type:Date,
    },

    
    
},{timestamps:true})


module.exports = model("Appointment", AppointmenSchema);