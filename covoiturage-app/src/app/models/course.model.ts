import { User } from "./user.model";
import { Location } from "./location.model";
import { State } from "./enum/state.enum";

export interface Course {
    id: number;
    departure: Location;
    arrival: Location;
    departureDate: Date;
    arrivalDate: Date;
    price: number;
    seats: number;
    driver: User;
    passengers: User[];
    state: State;
}