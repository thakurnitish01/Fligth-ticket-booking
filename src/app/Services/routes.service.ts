import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FlightRoute } from '../models/flight-route';


@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private collectionName = 'flightRoutes'; 

  private flightRoutesCollection : AngularFirestoreCollection<FlightRoute>;

  constructor(private firestore : AngularFirestore) { 
    this.flightRoutesCollection = firestore.collection<FlightRoute>('flightRoutes');
   }

   bookSeats(selectedSeats: any): Promise<DocumentReference<FlightRoute>> {
    return this.flightRoutesCollection.add(selectedSeats)
  }
  addFlightRoute(fligthRoute : FlightRoute): Promise<DocumentReference<FlightRoute>>{
    return this.flightRoutesCollection.add(fligthRoute)
  }
  getFlights(): Observable<any[]> {
    return this.firestore.collection('flightRoutes').valueChanges({idField :'id'});
  }
  getFlightById(id: string): Observable<FlightRoute | any> {
    return this.flightRoutesCollection.doc<FlightRoute>(id).valueChanges();
  }
  deleteFlightRoute(id: string): Promise<void> {
    return this.flightRoutesCollection.doc(id).delete();
  }
  searchFlights(searchTerm: string): Observable<FlightRoute[]> {
    return this.firestore.collection<FlightRoute>(this.collectionName, ref =>
      ref.where('flightNo', '==', searchTerm.toUpperCase())
    ).valueChanges();
  }
}
