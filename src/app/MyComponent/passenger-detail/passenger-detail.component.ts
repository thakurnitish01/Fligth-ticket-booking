import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.css']
})
export class PassengerDetailComponent implements OnInit {
  selectedSeat: any;
  passengerName: string  | any;
  passengerAge: number | any;

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.selectedSeat) {
      this.selectedSeat = state.selectedSeat;
    } else {
      // Handle if no selected seat data available
      this.router.navigate(['/']);
    }
  }

  submitPassengerDetails() {
    // Handle passenger details submission here

    // After submitting, navigate back to the flight details page
    this.router.navigate(['/']);
  }
}
