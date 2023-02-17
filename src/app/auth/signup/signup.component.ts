import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

type validator= {error: boolean |undefined, message: string};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  @ViewChild("nForm")
  signupForm: NgForm | undefined;

  
  ngOnInit(): void {

  }

  onFormSubmit(): void{
    if (!this.signupForm?.form.valid) return;
    console.log(this.signupForm.form.value);
  }

  emailValidate():validator {
    return {
      "error":
      !(this.signupForm?.form.get("email")?.valid) && this.signupForm?.form.get("email")?.touched && this.signupForm?.form.get("email")?.dirty,
      message: "please enter valid email"
    };
  }
  passValidate():validator {
    return {
      "error":
      !(this.signupForm?.form.get("password")?.valid) && this.signupForm?.form.get("password")?.touched && this.signupForm?.form.get("password")?.dirty ,
      message: "please enter valid password" + ( this.signupForm?.form.get("password")?.value.length < 6 ?", must be greater than 6 char" :"")
    };
  }
  cPassValidate():validator {
    return {
      "error":
      (this.signupForm?.form.get("cPassword")?.touched &&  this.signupForm?.form.get("cPassword")?.dirty)
      && (!(this.signupForm?.form.get("password")?.valid) || (this.signupForm?.form.get("password")?.value != this.signupForm?.form.get("cPassword")?.value)),
      message: "password doesn't match"
    };
  }
}
