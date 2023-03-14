import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnswerComponent } from './pages/how-it-works/answer/answer.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TranslateContainerComponent } from './pages/translate-container/translate-container.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'translate-it', component: TranslateContainerComponent },
  {
    path: 'questions',
    component: HowItWorksComponent,
    children: [{ path: ':id', component: AnswerComponent }],
  },
  { path: 'pricing', component: PricingComponent },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/:type', component: AuthComponent, canActivate: [AuthGuard] },
  // {path: "user", redirectTo: 'auth/login',pathMatch:'full'},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'permission-denied', component: PermissionDeniedComponent },
  { path: '**', redirectTo: 'page-not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
