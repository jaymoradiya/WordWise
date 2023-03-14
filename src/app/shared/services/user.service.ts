import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { CONFIG } from '../../../config/config';
import { CoreHttpService } from './core-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API = CONFIG.API;

  constructor(private httpCore: CoreHttpService) {}

  saveUser(user: UserModel) {
    return this.httpCore.put(
      `${this.API.DB_BASE_URL}${this.API.USERS}/${user.id}.json`,
      user.toJson()
    );
  }

  getUserData(user: UserModel) {
    return this.httpCore.get(
      `${this.API.DB_BASE_URL}${this.API.USERS}/${user.id}.json`
    );
  }
}
