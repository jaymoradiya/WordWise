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

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "translate-it", component: TranslateContainerComponent},
  {path: "questions", component: HowItWorksComponent,
  children: [
    {path: ":id", component: AnswerComponent},
  ]},
  {path: "pricing", component: PricingComponent},
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "**", redirectTo: "page-not-found"},
];

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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
