import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthModel, UserModel } from '../../../model/user.model';
import { AuthType } from '../../../model/auth.type.enum';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ResponseModel } from '../../../model/response.model';
import { EventEmitter, Output } from '@angular/core';
import { CONFIG } from '../../../../config/config';
import { CoreHttpService } from '../../../shared/http/core-http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API = CONFIG.API;
  constructor(private httpCore: CoreHttpService, private authService:AuthService ) { }

  saveUser(user: UserModel) {
    const header = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.httpCore.post(
      this.API.DB_BASE_URL + this.API.USERS + '.json',
      user.toJson()
    );
  }


  getUserData(){
    // this.httpCore.post()
  }
}
