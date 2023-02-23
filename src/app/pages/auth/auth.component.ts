import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from '../../model/response.model';

import { Observable } from 'rxjs';
import { AuthType } from 'src/app/model/auth.type.enum';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';

type validator= {error: boolean |undefined, message: string};
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {
  
  @ViewChild("authForm")
  authForm: NgForm | undefined;

  @ViewChild("signupForm")
  signupForm: NgForm | undefined;

  @ViewChild('resetForm')
  resetForm: NgForm | undefined;

  authType: AuthType = AuthType.signup;
  AuthTypes = AuthType;
  response: Observable<ResponseModel> | undefined;

  pageInfo: {
    title: string;
    subtitle_prefix: string;
    linkText: string;
    subtitle_suffix: string;
  } = {
    title: '',
    subtitle_prefix: '',
    subtitle_suffix: '',
    linkText: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    var type = this.route.snapshot.params['type'];
    this.changeAuthType(type);
    this.route.params.subscribe((params) => {
      this.changeAuthType(params['type']);
    });
  }


  onSubmit(){
    if (!this.authForm?.valid) return;
    var user: UserModel = this.authForm?.form.value;
    switch (this.authType){
      case AuthType.login:
        this.response = this.authService.login(user);
        break;
      case AuthType.signup:
        this.response = this.authService.signup(user);
        break;
      case AuthType.resetPass:
        this.response = this.authService.resetPass(user);
        break;
    }

  }

  emailValidate():validator {
    return {
      "error":
      !(this.authForm?.form.get("email")?.valid) && this.authForm?.form.get("email")?.touched && this.authForm?.form.get("email")?.dirty,
      message: "please enter valid email"
    };
  }
  passValidate():validator {
    return {
      "error":
      !(this.authForm?.form.get("password")?.valid) && this.authForm?.form.get("password")?.touched && this.authForm?.form.get("password")?.dirty ,
      message: "please enter valid password" + ( this.authForm?.form.get("password")?.value.length < 6 ?", must be greater than 6 char" :"")
    };
  }
  cPassValidate():validator {
    return {
      "error":
      (this.authForm?.form.get("cPassword")?.touched &&  this.authForm?.form.get("cPassword")?.dirty)
      && (!(this.authForm?.form.get("password")?.valid) || (this.authForm?.form.get("password")?.value != this.authForm?.form.get("cPassword")?.value)),
      message: "password doesn't match"
    };
  }

  changeAuthType(type: string) {
    switch (type) {
      case AuthType.login:
        this.authType = AuthType.login;
        break;
      case  AuthType.signup:
        this.authType = AuthType.signup;
        break;
      case  AuthType.resetPass:
        this.authType = AuthType.resetPass;
        break;
    }
    this.updatePageInfo();
  }

  changeAuthAndNavigate(type: string) {
    if (type != this.authType.toString()) {
      this.changeAuthType(type);
      this.navigateToNewPage();
    }
  }

  navigateToNewPage() {
    this.router.navigate([`/auth/${this.authType}`], {});
  }

  updatePageInfo() {
    switch (this.authType) {
      case AuthType.login:
        this.pageInfo.title = 'Login with your Account';
        this.pageInfo.subtitle_prefix = 'or create ';
        this.pageInfo.subtitle_suffix = 'for free';
        this.pageInfo.linkText = 'new account';
        break;
      case AuthType.signup:
        this.pageInfo.title = 'Create a new Account';
        this.pageInfo.subtitle_prefix = 'or login with ';
        this.pageInfo.subtitle_suffix = '';
        this.pageInfo.linkText = 'existing account';
        break;
      case AuthType.resetPass:
        this.pageInfo.title = 'Forgot password?';
        this.pageInfo.subtitle_prefix = 'remember pass? ';
        this.pageInfo.subtitle_suffix = 'with your account';
        this.pageInfo.linkText = 'login ';
        break;

      default:
        break;
    }
  }

  messageClasses(res: ResponseModel) {
    return {
      error: res?.error,
      success: !res?.error,
      visible: res,
    };
  }

  closeMessage() {
    this.response = undefined;
  }
}
