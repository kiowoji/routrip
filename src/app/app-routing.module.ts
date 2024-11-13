import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllTripsComponent } from './pages/all-trips/all-trips.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { TripFormComponent } from './pages/trip-form/trip-form.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'all-trips', component: AllTripsComponent },
  { path: 'trip/:id', component: TripPageComponent },
  { path: 'create-trip', component: TripFormComponent },
  { path: 'edit-trip/:id', component: TripFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
