import $api from "../http/index";

export default class AuthService{
    static async login(email, password){
        return $api.post("/login", {email, password});
    }

    static async registration(email, password, phoneNumber, fullName){
        return $api.post("/registration", {email, password, phoneNumber, fullName});
    }    

    
    static async logout(){
        return $api.post("/logout");
    } 
}