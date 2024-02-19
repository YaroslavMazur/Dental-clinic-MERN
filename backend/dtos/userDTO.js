module.exports = class UserDTO{
    email;
    id;
    isActivated;
    role;
    fullName;

    constructor(model){
        this.fullName = model.fullName;
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.isActivated =model.isActivated;
    }

}