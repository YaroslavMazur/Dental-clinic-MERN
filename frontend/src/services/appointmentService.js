import $api from "../http/index";

export default class AppointmentService{
    static async addNewAppointment(data){
        return $api.post("/addAppointment", data);
    }

    static async getAvaliableHours(doctorId, date){
        return $api.get(`/getAvaliableHours?doctorId=${doctorId}&date=${date}`);
    }
    static async getAllAppointments(userId){
        return $api.get(`/getAllAppointments?userId=${userId}`);

    }

}