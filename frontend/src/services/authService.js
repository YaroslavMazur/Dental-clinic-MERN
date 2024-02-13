import $api from "../http/index";

export default class AuthService{
    static login(email, password){
        return $api.post("/login", {email, password});
    }

    static registration(email, password, phoneNumber, fullName){
        return $api.post("/registration", {email, password, phoneNumber, fullName});
    }    

    
    static logout(){
        return $api.post("/logout");
    } 
    
    static googleAuth(){
        return $api.get("/auth/google")
    }
}