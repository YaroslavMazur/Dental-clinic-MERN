import $api from "../http/index";

export default class UserService{
    static async fetchUsers(){
        return $api.get("/users");
    }

    static async fetchUser(id){
        return $api.get(`/userData/${id}`);
    }
    static async fetchAllDoctors(){
        return $api.get("/doctors");
    }
}