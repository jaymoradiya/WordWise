import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from '../model/response.model';
import { UserModel } from '../model/user.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {

  authType: string  = "";
  response: Observable<ResponseModel> | undefined;

  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService){
  }

  ngOnInit(): void {
    var url = this.route.snapshot.url;
    this.authType = url[url.length -1].path;
    this.route.url.subscribe((url) => {
      this.authType =url[url.length - 1].path;
    });

    this.authService.onSubmit.subscribe((value) => {
      if (value.type == "login"){
        this.response = this.authService.login(value.data);
      }
      if (value.type == "signup"){
        this.response = this.authService.signup(value.data);
      }
    });
  }

  changeAuth(type:string){
    if (type != this.authType){
      this.authType = this.authType == 'login' ? 'signup':'login';
      this.router.navigate([this.authType],{relativeTo: this.route});
    }
  }


  messageClasses(res: ResponseModel){
    return {
      "error": res?.error,
      "success": !res?.error,
      "visible": res,
    }
  }

  closeMessage(){
    this.response = undefined;
  }
  
}
