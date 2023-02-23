import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AuthType } from './model/auth.type.enum';
import { AuthComponent } from './pages/auth/auth.component';
import { ChangePassComponent } from './pages/auth/change-pass/change-pass.component';
import { ForgotPassComponent } from './pages/auth/forgot-pass/forgot-pass.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnswerComponent } from './pages/how-it-works/answer/answer.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TranslateContainerComponent } from './pages/translate-container/translate-container.component';

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
