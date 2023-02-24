import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeInfoComponent } from './pages/home-page/home-info/home-info.component';
import { InputCardComponent } from './pages/home-page/input-card/input-card.component';
import { TranslateContainerComponent } from './pages/translate-container/translate-container.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LanguageTransformPipe } from './language-transform.pipe';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnswerComponent } from './pages/how-it-works/answer/answer.component';
import { QuestionComponent } from './pages/how-it-works/questions-list/question/question.component';
import { QuestionsListComponent } from './pages/how-it-works/questions-list/questions-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { LoggingInterceptorInterceptor } from './core/services/interceptor/logging-interceptor.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { UserComponent } from './pages/user/user.component';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


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
    AuthComponent,
    LanguageTransformPipe,
    LoaderComponent,
    UserComponent,
    PermissionDeniedComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: LoggingInterceptorInterceptor, 
      multi: true, 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
