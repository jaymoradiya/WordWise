import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: UserModel | null | undefined;

  constructor(private authService:AuthService){}


  ngOnInit(): void {
      this.authService.user.subscribe(user => {
        this.user = user;
      })
  }

}
