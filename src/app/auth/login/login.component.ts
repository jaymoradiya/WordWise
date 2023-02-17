import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});
  
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
    if (!this.loginForm.valid) return;
    console.log(this.loginForm.value);
    
  }
}
