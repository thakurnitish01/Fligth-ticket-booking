import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComponent/home/home.component';
import { SigninComponent } from './MyComponent/signin/signin.component';
import { SignupComponent } from './MyComponent/signup/signup.component';
import { NanvbarComponent } from './MyComponent/nanvbar/nanvbar.component';
import { AdminGuard } from './admin.guard';
import { AddFlightComponent } from './MyComponent/add-flight/add-flight.component';
import { FlightDetailsComponent } from './MyComponent/flight-details/flight-details.component';
import { TicketsComponent } from './MyComponent/tickets/tickets.component';
import { PassengerDetailComponent } from './MyComponent/passenger-detail/passenger-detail.component';

const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'signin', component : SigninComponent},
  {path:'signup', component : SignupComponent},
  {path:'navbar', component : NanvbarComponent},
  {path:'addflights', component : AddFlightComponent},
  { path: 'flight-details/:id', component: FlightDetailsComponent },
  { path: 'flights', component: TicketsComponent },
  { path: 'passenger-detail/:seatNumber', component: PassengerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
