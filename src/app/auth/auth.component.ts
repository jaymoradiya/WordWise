import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {

  authType: string  = "";

  constructor(private route: ActivatedRoute,private router: Router){
  }

  ngOnInit(): void {
    var url = this.route.snapshot.url;
    this.authType = url[url.length -1].path;
    this.route.url.subscribe((url) => {
      this.authType =url[url.length - 1].path;
    });
  }

  changeAuth(type:string){
    if (type != this.authType){
      this.authType = this.authType == 'login' ? 'signup':'login';
      this.router.navigate([this.authType],{relativeTo: this.route});
    }
  }
  
}
