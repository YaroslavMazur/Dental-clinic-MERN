module.exports = class UserDTO{
    email;
    id;
    isActivated;
    role;
    name;

    constructor(model){
        this.name = model.fullName;
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.isActivated =model.isActivated;
    }

}