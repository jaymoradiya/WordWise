export class UserModel {
    constructor(
        public email:string,
        public id: string,
        private _token: string,
        private _refreshToken: string,
        private _expireAt: Date,
    ){}

    get token() {
        if (!this._expireAt || this._expireAt < new Date()){
            return null;
        }
        return this._token;
    }
}

export interface UserAuthModel {
    email: string,
    password: string,
    otp? : number,
}