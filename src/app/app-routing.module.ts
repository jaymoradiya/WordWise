import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AnswerComponent } from './how-it-works/answer/answer.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { TranslateContainerComponent } from './translate-container/translate-container.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './auth/change-pass/change-pass.component';
import { AuthType } from './model/auth.type.enum';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "translate-it", component: TranslateContainerComponent},
  {path: "questions", component: HowItWorksComponent,
  children: [
    {path: ":id", component: AnswerComponent},
  ]},
  {path: "pricing", component: PricingComponent},
  {path:"auth", redirectTo: "auth/signup",pathMatch: 'full'},
  {path: "auth", component: AuthComponent, 
  children: [
    {path: "login", component: LoginComponent, data: {'type': AuthType.login}},
    {path: "signup", component: SignupComponent, data: {'type': AuthType.signup}},
    {path: "forgotPass", component: ForgotPassComponent, data: {'type': AuthType.forgotPass}},
    {path: "change-pass", component: ChangePassComponent, data: {'type': AuthType.changePass}},
  ],
  },
  {path: "signup", component: SignupComponent},
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "**", redirectTo: "page-not-found"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
