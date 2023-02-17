import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './model/user.model';
import { Observable } from 'rxjs';
import { ResponseModel } from './model/response.model';
import { EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = "http://localhost:3000/";
  onSubmit: EventEmitter<{type: string, data: UserModel}> = new  EventEmitter();

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
}
