import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub : Subscription | undefined;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void {
      this.userSub?.unsubscribe();
  }


  onLogout(){
    this.authService.logout();
  }

}
