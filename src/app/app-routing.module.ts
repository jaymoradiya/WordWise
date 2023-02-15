import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AnswerComponent } from './how-it-works/answer/answer.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { TranslateContainerComponent } from './translate-container/translate-container.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
