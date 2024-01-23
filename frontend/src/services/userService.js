import $api from "../http/index";

export default class UserService{
    static async fetchUsers(){
        return $api.get("/users");
    }
}