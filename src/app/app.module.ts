import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TranslateContainerComponent } from './translate-container/translate-container.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PricingComponent } from './pricing/pricing.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeInfoComponent } from './home-page/home-info/home-info.component';
import { InputCardComponent } from './home-page/input-card/input-card.component';
import { QuestionsListComponent } from './how-it-works/questions-list/questions-list.component';
import { AnswerComponent } from './how-it-works/answer/answer.component';
import { QuestionComponent } from './how-it-works/questions-list/question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeInfoComponent,
    InputCardComponent,
    TranslateContainerComponent,
    HowItWorksComponent,
    PricingComponent,
    HomePageComponent,
    QuestionsListComponent,
    AnswerComponent,
    QuestionComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
