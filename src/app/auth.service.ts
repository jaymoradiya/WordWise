import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './model/user.model';
import { AuthType } from './model/auth.type.enum';
import { Observable } from 'rxjs';
import { ResponseModel } from './model/response.model';
import { EventEmitter, Output } from '@angular/core';
import {  CONFIG } from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = "http://localhost:3000/";
  onSubmit: EventEmitter<{type: AuthType, data: UserModel}> = new  EventEmitter();

  constructor(private http: HttpClient) { }


  allUser(): Observable<UserModel> {
    return this.http.get<UserModel>(this.URL+"users");
  }

  login(user: UserModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.URL+"login", {
      "email": user.email,
      "password": user.password,
    });
  }

  signup(user: UserModel): Observable<ResponseModel> {
    return  this.http.post<ResponseModel>(this.URL+"signup", {
      "email": user.email,
      "password": user.password,
    });
  }
  resetPass(user: UserModel): Observable<ResponseModel> {
    return  this.http.post<ResponseModel>(this.URL+"sendOtp", {
      "email": user.email,
    });
  }
  verifyOtpAndChangePass(user: UserModel): Observable<ResponseModel> {
    return  this.http.post<ResponseModel>(this.URL+"verifyOtp", {
      "email": user.email,
      "password": user.password ,
      "otp": user.otp,
    });
  }
}
