import $api from "../http/index";

export default class AppointmantService{
    static async addNewAppointmant(data){
        return $api.post("/addAppointment", data);
    }

    static async getAvaliableHours(doctorId, date){
        return $api.get(`/getAvaliableHours?doctorId=${doctorId}&date=${date}`);
    }
    static async getAllAppointmants(userId){
        return $api.get(`/getAllAppointmants?userId=${userId}`);

    }

}