import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/Services/routes.service';
import { FlightRoute } from 'src/app/models/flight-route';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flights!: FlightRoute[];
  flight: FlightRoute[] | any;
  searchTerm: string = '';


  constructor(private routeServices: RoutesService, private router: Router) { }

  ngOnInit(): void {
    this.getFlightDetails();
  }

  getFlightDetails(): void {
    this.routeServices.getFlights().subscribe(
      (respo: FlightRoute[]) => {
        this.flights = respo;
      },
      (error) => {
        console.log("got some error..!", error);
      }
    );
  }

  openFlightDetails(flightId: string) {
    this.router.navigate(['/flight-details', flightId]);
  }
  deleteFlight(flightId: string) {
    this.routeServices.deleteFlightRoute(flightId)
      .then(() => {
        console.log('Flight deleted successfully!');
        // Optional: You can reload the flight list after deletion
        this.getFlightDetails();
      })
      .catch((error: any) => {
        console.log('Error deleting flight:', error);
      });
  }

  searchFlights(): void {
    this.routeServices.searchFlights(this.searchTerm).subscribe(
      (flights: FlightRoute[]) => {
        // Update the flight property with the search results
        this.flight = flights.length > 0 ? flights[0] : undefined;
      },
      (error) => {
        console.log("Error fetching flight details:", error);
      }
    );
  }
}
