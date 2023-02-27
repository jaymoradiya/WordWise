import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from '../../model/response.model';

import { Observable, Subscription } from 'rxjs';
import { AuthType } from 'src/app/model/enum/auth-type.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { UserAuthModel } from 'src/app/model/user-auth.model';

type validator = { error: boolean | undefined; message: string };
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm')
  authForm: NgForm | undefined;

  @ViewChild('signupForm')
  signupForm: NgForm | undefined;

  @ViewChild('resetForm')
  resetForm: NgForm | undefined;

  authType: AuthType = AuthType.signup;
  AuthTypes = AuthType;
  response: ResponseModel | null | undefined;
  responseOb: Observable<ResponseModel | null> | undefined;
  responseSub: Subscription | undefined;

  isLoading = false;

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

  ngOnDestroy(): void {
    this.responseSub?.unsubscribe();
  }

  onSubmit() {
    if (!this.authForm?.valid) return;
    this.isLoading = true;
    var user: UserAuthModel = this.authForm?.form.value;
    switch (this.authType) {
      case AuthType.login:
        this.responseOb = this.authService.login(user);
        break;
      case AuthType.signup:
        this.responseOb = this.authService.signup(user);
        break;
      case AuthType.resetPass:
        this.responseOb = this.authService.resetPass(user);
        break;
    }

    this.responseSub = this.responseOb?.subscribe(
      (res) => {
        this.response = res;
        this.isLoading = false;
        this.router.navigate(['profile']);
      },
      (err) => {
        console.log('error occurred!!');
        this.isLoading = false;
        this.response = err;
      },
      null
    );
  }

  emailValidate(): validator {
    return {
      error:
        (!this.authForm?.form.get('email')?.valid &&
          this.authForm?.form.get('email')?.touched &&
          this.authForm?.form.get('email')?.dirty) == true,
      message: 'please enter valid email',
    };
  }
  passValidate(): validator {
    return {
      error:
        (!this.authForm?.form.get('password')?.valid &&
          this.authForm?.form.get('password')?.touched &&
          this.authForm?.form.get('password')?.dirty) == true,
      message:
        'please enter valid password' +
        (this.authForm?.form.get('password')?.value.length < 6
          ? ', must be greater than 6 char'
          : ''),
    };
  }
  cPassValidate(): validator {
    return {
      error:
        (this.authForm?.form.get('cPassword')?.touched &&
          this.authForm?.form.get('cPassword')?.dirty &&
          (!this.authForm?.form.get('password')?.valid ||
            this.authForm?.form.get('password')?.value !=
              this.authForm?.form.get('cPassword')?.value)) == true,
      message: "password doesn't match",
    };
  }

  changeAuthType(type: string) {
    switch (type) {
      case AuthType.login:
        this.authType = AuthType.login;
        break;
      case AuthType.signup:
        this.authType = AuthType.signup;
        break;
      case AuthType.resetPass:
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
      error: !res?.code,
      success: res?.code,
      visible: res,
    };
  }

  closeMessage() {
    this.response = undefined;
  }
}
