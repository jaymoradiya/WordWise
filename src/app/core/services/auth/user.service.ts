import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthModel, UserModel } from '../../../model/user.model';
import { AuthType } from '../../../model/auth.type.enum';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ResponseModel } from '../../../model/response.model';
import { EventEmitter, Output } from '@angular/core';
import {  CONFIG } from "../../../../config/config";
import { CoreHttpService } from '../../../shared/http/core-http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpCore: CoreHttpService, private authService:AuthService ) { }

  getUserData(){
    this.httpCore.post()
  }
}
