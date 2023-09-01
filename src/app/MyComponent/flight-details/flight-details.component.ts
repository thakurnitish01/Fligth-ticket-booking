// import { Component, OnInit,TemplateRef } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { RoutesService } from 'src/app/Services/routes.service';
// import { FlightRoute } from 'src/app/models/flight-route';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

// @Component({
//   selector: 'app-flight-details',
//   templateUrl: './flight-details.component.html',
//   styleUrls: ['./flight-details.component.css']
// })
// export class FlightDetailsComponent implements OnInit {



//   flight: FlightRoute | undefined;
//   seats: any[] = [];
//   visible: boolean = false;
//   bookingForm: FormGroup | any; 
//   selectedSeat: string = ''; 

//   constructor(
//     private route: ActivatedRoute,
//     private routeService: RoutesService,
//     private formBuilder: FormBuilder,
//   ) {
//     const totalSeats = 27;
//     for (let i = 1; i <= totalSeats; i++) {
//       this.seats.push({ seatNo: i, booked: false });
//     }
//   }
  

//   ngOnInit(): void {
//     this.getFlightDetails();
//     this.createBookingForm(); 
//   }

//   createBookingForm() {
//     this.bookingForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       age: [null, Validators.required],
//       seat: [''] 
//     });
//   }


//   getFlightDetails(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.routeService.getFlightById(id).subscribe(
//         (flight: FlightRoute) => {
//           this.flight = flight;
//         },
//         (error) => {
//           console.log('Error fetching flight details:', error);
//         }
//       );
//     }
//   }

//   saveBookingToFirestore() {
//      console.log(this.bookingForm.value);
//   }

//   toggleSeat(rowIndex: number, columnIndex: number) {
//     this.seats[rowIndex][columnIndex].booked = !this.seats[rowIndex][columnIndex].booked;
//   }

//   isSeatSelected(): boolean {
//     return this.seats.some((seat) => seat.booked);
//   }

//   bookSeats(): void {
//     const selectedSeats = this.seats.filter((seat) => seat.booked);
//     console.log('Selected Seats:', selectedSeats);

//     if (selectedSeats.length === 0) {
//       console.log('No seats selected. Please select seats before booking.');
//       return;
//     }
//   }

//   selectSeat(seat: any) {
//     if (seat.booked) {
//       return;
//     }
//     seat.booked = !seat.booked;
//     this.selectedSeat = seat.booked ? seat.seatNo : '';
//     this.bookingForm.patchValue({ seat: this.selectedSeat }); 
//   }
//   BookingSeat()
//   {
//     const data = this.bookingForm.value;
//     console.log("Passenger Detail: ",data)
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from 'src/app/Services/routes.service';
import { FlightRoute } from 'src/app/models/flight-route';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

interface Seat {
  number: string;
  selected: boolean;
  booked: boolean;
  disabled: boolean;
}
interface Passenger {
  id: any;
  seatNumber: string;
  name: string;
  age: number;
  gender: string;
  userId: string;
}

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight: FlightRoute | any;
  seats: any[] = [];
  visible: boolean = false;
  bookingForm: FormGroup | any;
  selectedSeats: any[] = [];
  selectedSeat: string = '';
  passengers: Passenger[] = [];
  openForm: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private routeService: RoutesService,
    private formBuilder: FormBuilder,
    private auth : AuthService
  ) {
    // const totalSeats = 27;
    // for (let i = 1; i <= totalSeats; i++) {
    //   this.seats.push({ number: i.toString(), selected: false, booked: false, disabled: false });
    // }
  }

  ngOnInit(): void {
    // this.getFlightDetails();
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.getFlightDetails(routeId);
    }
    this.createBookingForm();
  }
  getTotalAvailableSeats(): number {
    if (this.flight && this.flight.availableSeats) {
      return this.flight.availableSeats;
    }
    return 0;
  }
  createBookingForm() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      seat: ['']
    });
  }

  getFlightDetails(id: string) {
    this.routeService.getFlightById(id).subscribe(
      (flight: FlightRoute) => {
        this.flight = flight;
        this.flight.availableSeats = Array.from({ length: 40 }, (_, index) => {
          return {
            number: (index + 1).toString(),
            selected: false,
            booked: false,
          };
        });
        this.flight.totalSeatsAvailable = this.getTotalAvailableSeats();
      
      },
      (error) => {
        console.log('Error fetching flight details:', error);
      }
    );
  }
  

  toggleSeat(seat: Seat) {
    if (!seat.booked) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeat = seat.number;
        this.flight.totalSeatsAvailable--;
      } else {
        this.selectedSeat = '';
        this.flight.totalSeatsAvailable++;
      }

      this.updateSelectedSeats();
    }
  }
  updateSelectedSeats() {
    this.selectedSeats = this.getSelectedSeats();
  }

  isSeatSelected(): boolean {
    return this.selectedSeats.length > 0;
  }

  bookSeats(): void {
    if (this.selectedSeats.length === 0) {
      console.log('No seats selected. Please select seats before booking.');
      return;
    }
    // Perform booking logic here
    console.log('Selected Seats:', this.selectedSeats);
  }

  // BookingSeat() {
  //   const data = this.bookingForm.value;
  //   console.log('Passenger Detail:', data);
  //   // Perform passenger details submission logic here
  // }
  getSelectedSeats(): string[] {
    if (this.flight && this.flight.availableSeats) {
      return this.flight.availableSeats.filter((seat: Seat) => seat.selected && !seat.booked).map((seat: Seat) => seat.number);

    }
    return [];
  }
 
  BookingSeat(): void {
    const currentUserId = this.auth.getCurrentUserId();
    if (!currentUserId) {
      console.log('User is not logged in. Please login first.');
      return;
    }
    if (this.selectedSeats.length > 0) {
      const passengers: Passenger[] = this.selectedSeats.map((seat, index) => ({
        id: index + 1,
        seatNumber: seat.number,
        name: '',
        age: 5,
        gender: 'M',
        userId: currentUserId, // Use the actual user ID string
      }));
      // this.routeService.bookSeats(passengers)
      //   .then((result) => {
      //     console.log('Seats booked successfully:', result);
      //     // Here you can perform any additional actions upon successful booking
      //   })
      //   .catch((error) => {
      //     console.error('Error booking seats:', error);
      //     // Handle error if booking fails
      //   });
      this.visible = true;
      this.disableSelectedSeats();
    } else {
      console.log('No seats selected.');
    }
  }
  
  //     this.visible = true;
  //     this.disableSelectedSeats();
  //   } else {
  //     console.log('No seats selected.');
  //   }
  // }
  
  disableSelectedSeats() {
    this.flight.availableSeats.forEach((seat: Seat) => {
      if (seat.selected && !seat.booked) {
        seat.booked = true;
        seat.selected = false;
        seat.disabled = true;
      }
    });
    this.flight.totalSeatsAvailable = this.getTotalAvailableSeats();
  }
  submitPassengerDetails() {
    const currentUserId = this.auth.isLoggedIn();
    if (!currentUserId) {
      console.log('User is not logged in. Please login first.');
      return;
    }

    console.log('Passenger Details:', this.passengers);

    this.routeService.bookSeats(this.passengers)
      .then(() => {
        console.log('Booking successful!');
        // this.messageService.add({ severity: 'success', summary: 'Booking successful!', detail: `Seat Number ${this.selectedSeat} has been booked.` });
        this.visible = false;
      })
      .catch((error) => {
        console.log('Error while booking seats:', error);
        // this.messageService.add({ severity: 'error', summary: 'Error while booking seats.', detail: 'Please try again later.' });
        this.visible = true;
      });
  }
  
}
