import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ResponseModel } from 'src/app/model/response.model';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});



  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
      this.loginForm = new FormGroup({
        "email": new FormControl(
          '', [Validators.required, Validators.email]
        ),
        "password": new FormControl(
          '', [Validators.required, Validators.minLength(6)]
        ),
        "rememberMe": new FormControl(false),
      });

  }

  onFormSubmit(): void{
    if (!this.loginForm.valid) {
      // this.response = undefined;
      return;
    }
    var user: UserModel = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password,
    };
    this.authService.onSubmit.emit({type: 'login',data: user});
  }


}
