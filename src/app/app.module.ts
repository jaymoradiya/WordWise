import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileIconComponent } from './shared/components/profile-icon/profile-icon.component';
import { ThemeBtnComponent } from './shared/components/theme-btn/theme-btn.component';
import { LogInterceptor } from './shared/interceptor/log.interceptor';

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
    ProfileComponent,
    PermissionDeniedComponent,
    DashboardComponent,
    ProfileIconComponent,
    ThemeBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
