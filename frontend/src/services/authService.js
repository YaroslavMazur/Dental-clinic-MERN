import $api from "../http/index";

export default class AuthService{
    static login(email, password){
        return $api.post("/login", {email, password});
    }

    static async registration(email, password, phoneNumber, fullName){
        return $api.post("/registration", {email, password, phoneNumber, fullName});
    }    

    
    static logout(){
        return $api.post("/logout");
    } 
}