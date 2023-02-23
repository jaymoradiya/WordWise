import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthModel, UserModel } from '../../../model/user.model';
import { AuthType } from '../../../model/auth.type.enum';
import { Observable, Subject, map } from 'rxjs';
import { ResponseModel } from '../../../model/response.model';
import { EventEmitter, Output } from '@angular/core';
import {  CONFIG } from "../../../../config/config";
import { CoreHttpService } from '../../../shared/http/core-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<UserModel>();
  constructor(private httpCore: CoreHttpService) { }

  login(user: UserAuthModel): Observable<ResponseModel | null> {
    return this.httpCore.post<ResponseModel>(CONFIG.API.LOGIN, {
      "email": user.email,
      "password": user.password,
    }).pipe(
      map((res) => {
        let response = res.body;
        if (response){
          response.message = "Logged in successfully";
          response.code = res.status;
          this.handleAuthentication(response);
        }
        return response;
      }),
    );
  }

  signup(user: UserAuthModel): Observable<ResponseModel | null> {
    return this.httpCore.post<ResponseModel>(CONFIG.API.SIGNUP, {
      "email": user.email,
      "password": user.password,
    }).pipe(
      map((res) => {
        let response = res.body;
        if (response){
          response.message = "Signup successfully";
          response.code = res.status;
          this.handleAuthentication(response);
        }
        return response;
      }),
    );
  }
  
  resetPass(user: UserAuthModel): Observable<ResponseModel | null> {
    return  this.httpCore.post<ResponseModel>(CONFIG.API.RESET_PASS, {
      "email": user.email,
    }).pipe(
      map((res) => {
        let response = res.body;
        if (response){
          response.message = "OTP sent to your email!";
          response.code = res.status;
        }
        return response;
      }),
    );
  }

  verifyOtpAndChangePass(user: UserAuthModel): Observable<ResponseModel | null> {
    return  this.httpCore.post<ResponseModel>(CONFIG.API.CONFIRM_PASS, {
      "email": user.email,
      "password": user.password ,
      "otp": user.otp,
    }).pipe(
      map((res) => {
        let response = res.body;
        if (response){
          response.message = "Password Changed!";
          response.code = res.status;
        }
        return response;
      }),
    );
  }

  handleAuthentication(response: ResponseModel){
    const expirationDate = new Date(
      new Date().getTime() + (+response.expiresIn * 1000)
    )
    const userData = new UserModel(
      response.email,
      response.localId,
      response.idToken,
      response.refreshToken,
      expirationDate,
    );
    this.user.next(userData);
  }
}
