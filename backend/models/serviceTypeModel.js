
const {Schema, model} = require('mongoose');

const ServiceTypeSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    
    about:{
        type:String,
    },
    
    price:{
        type:Number
    },

    duration:{
        type: Number,
        default:30,
    },
    
})


module.exports = model("ServiceType", ServiceTypeSchema);