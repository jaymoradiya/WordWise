import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WordWise';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.authService.autoLogin();
  }
}
