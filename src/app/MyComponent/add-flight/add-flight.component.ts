import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference, fromDocRef } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/Services/routes.service';
import { FlightRoute } from 'src/app/models/flight-route';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  flightRouteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private addFlight : RoutesService,
              private router  : Router,
              private firestore : AngularFirestore) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.flightRouteForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      flightNo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  onFlightNoInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  onSubmit() {
    if (this.flightRouteForm.valid) {
      const flightRoute : FlightRoute = this.flightRouteForm.value;
      const flightId: string = this.firestore.createId();

      flightRoute.id = flightId;
      this.addFlight.addFlightRoute(flightRoute)
      .then((docRef : DocumentReference<FlightRoute>)=>{
        console.log("flight added successfully...!",docRef.id);
        this.router.navigate([''])
      })
      .catch((error)=>{
        console.log("got some error",error);
      })
    }
  }
}
