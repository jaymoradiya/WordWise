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
    return this.httpCore.post(
      this.API.DB_BASE_URL + this.API.USERS + '.json',
      user.toJson()
    );
  }

  getUserData() {
    // this.httpCore.post()
  }
}
