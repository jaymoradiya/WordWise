import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from '../../model/response.model';

import { Observable } from 'rxjs';
import { AuthType } from 'src/app/model/auth.type.enum';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {
  authType: AuthType = AuthType.signup;
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
    var url = this.route.snapshot.url;
    this.changeAuthType(url[url.length-1].path);
    this.route.url.subscribe((url) => {
      this.changeAuthType(url[url.length - 1].path);
    });
    this.authType.toString();

    this.authService.onSubmit.subscribe((value) => {
      if (value.type == AuthType.login) {
        this.response = this.authService.login(value.data);
      }
      if (value.type == AuthType.signup) {
        this.response = this.authService.signup(value.data);
      }
      if (value.type == AuthType.forgotPass) {
        this.response = this.authService.sendOtp(value.data);
        console.log(this.response);
      }
      this.updatePageInfo();
    });
  }

  changeAuthType(type: string) {
    switch (type) {
      case 'login':
        this.authType = AuthType.login;
        break;
      case 'signup':
        this.authType = AuthType.signup;
        break;
      case 'forgotPass':
        this.authType = AuthType.forgotPass;
        break;
  
    }
    this.updatePageInfo();
  }

  changeAuth(type: string) {
    if (type != this.authType.toString()) {
      this.changeAuthType(type);
      this.navigateToNewPage();
    }
  }

  navigateToNewPage() {
    this.router.navigate([this.authType.toString()], {
      relativeTo: this.route,
    });
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
      case AuthType.forgotPass:
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
