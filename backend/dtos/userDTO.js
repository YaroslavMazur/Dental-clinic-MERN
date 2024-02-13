module.exports = class UserDTO{
    email;
    id;
    isActivated;
    role;

    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.isActivated =model.isActivated;
    }

}