export interface ResponseModel {
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string,
    code?: number,
    message? : string,
}