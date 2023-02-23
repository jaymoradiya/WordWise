class UserModel {
    email;
    password;
    otp;
    constructor( email,  password){
        this.email = email;
        this.password = password;
    }
    toJson(){
        return {
            'email': this.email,
            'password': this.password,
        }
    }
}


const USERS = [
    new UserModel("jay@gmail.com","123456"),
    new UserModel("vivek@gmail.com","123456"),
];

module.exports = {USERS, UserModel};
