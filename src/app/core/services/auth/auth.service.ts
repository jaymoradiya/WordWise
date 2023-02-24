import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthModel, UserModel } from '../../../model/user.model';
import { AuthType } from '../../../model/auth.type.enum';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ResponseModel } from '../../../model/response.model';
import { EventEmitter, Output } from '@angular/core';
import {  CONFIG } from "../../../../config/config";
import { CoreHttpService } from '../../../shared/http/core-http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModel | null>( null);
  autoLogoutTimer :any;

  constructor(private httpCore: CoreHttpService,private router:Router) { }

  login(user: UserAuthModel): Observable<ResponseModel | null> {
    return this.httpCore.post<ResponseModel>(CONFIG.API.LOGIN, {
      "email": user.email,
      "password": user.password,
      "returnSecureToken": true,
    }).pipe(
      map((res) => {
        let response = res.body;
        if (response){
          response.message = "Logged in successfully";
          response.code = res.status;
          this.handleAuthentication(response,user.rememberMe);
        }
        return response;
      }),
    );
  }

  autoLogin(){
    const userData:{
      email: string;
      id: string;
      _token: string;
      _refreshToken: string;
      _expireAt: string;
    } = JSON.parse(localStorage.getItem(CONFIG.STRING.USER_DATA) ?? "{}");
    if(!userData){
      return;
    }
    const savedUser = UserModel.fromJson(userData);
    if (savedUser.token){
      const expirationTimeLeft = new Date(userData._expireAt).getTime() - new Date().getTime();
      this.autoLogout(expirationTimeLeft);
      this.user.next(savedUser);
    }
  }

  signup(user: UserAuthModel): Observable<ResponseModel | null> {
    return this.httpCore.post<ResponseModel>(CONFIG.API.SIGNUP, {
      "email": user.email,
      "password": user.password,
      "returnSecureToken": true,
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

  logout(){
    this.user.next(null);
    localStorage.removeItem(CONFIG.STRING.USER_DATA);
    if (this.autoLogoutTimer){
      clearInterval(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
    this.router.navigate(['']);
  } 

  autoLogout(expirationTimeLeft: number){
    this.autoLogoutTimer = setInterval(()=> {
      this.logout();
    },expirationTimeLeft);
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

  handleAuthentication(response: ResponseModel,rememberMe?:boolean | undefined){
    console.log(response);
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
    if (rememberMe){
      localStorage.setItem(CONFIG.STRING.USER_DATA,JSON.stringify(userData));
    }
    this.autoLogout(+response.expiresIn*1000);
    this.user.next(userData);
  }
}
