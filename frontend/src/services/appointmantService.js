import $api from "../http/index";

export default class AppointmantService{
    static async addNewAppointmant(data){
        return $api.post("/addAppointment", data);
    }

}