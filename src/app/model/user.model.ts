export interface UserModel {
    email:string;
    password: string;
    otp?: string | null;
}