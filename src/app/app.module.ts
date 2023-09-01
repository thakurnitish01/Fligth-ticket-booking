import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NanvbarComponent } from './MyComponent/nanvbar/nanvbar.component';
import { SigninComponent } from './MyComponent/signin/signin.component';
import { SignupComponent } from './MyComponent/signup/signup.component';
import { HomeComponent } from './MyComponent/home/home.component';

import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import {MatButtonModule} from '@angular/material/button';
import { AdminGuard } from './admin.guard';
import {MatIconModule} from '@angular/material/icon';
import { AddFlightComponent } from './MyComponent/add-flight/add-flight.component';
// import {MessageService} from 'primeng/api'

import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlightDetailsComponent } from './MyComponent/flight-details/flight-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { TicketsComponent } from './MyComponent/tickets/tickets.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PassengerDetailComponent } from './MyComponent/passenger-detail/passenger-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NanvbarComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AddFlightComponent,
    FlightDetailsComponent,
    TicketsComponent,
    PassengerDetailComponent
  ],
  imports: [
    BrowserModule,MatButtonModule,MatInputModule,MatCardModule,
    AppRoutingModule,MatIconModule, ReactiveFormsModule,
    DialogModule,
    MatGridListModule,MatCheckboxModule,MatRadioModule,
    FormsModule,MatDividerModule,BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase) 
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
