export interface FlightRoute {
    availableSeats: any;
    totalSeatsAvailable: any | number;
    id: string;
    flightNo : any;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    amount: number;
  }
  