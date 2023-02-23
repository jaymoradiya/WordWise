import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserModel } from "../../model/user.model";
import { NgForm } from '@angular/forms';
import { AuthType } from 'src/app/model/auth.type.enum';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {

  @ViewChild('form')
  form: NgForm | undefined;


  constructor(private authService: AuthService){}

  onFormSubmit(){
    if (!this.form?.form.valid)return;
    var user:UserModel = {
      email: this.form?.form.get('email')?.value,
      password: "",
    }
    this.authService.onSubmit.emit({type: AuthType.forgotPass,data: user});
  }
}
