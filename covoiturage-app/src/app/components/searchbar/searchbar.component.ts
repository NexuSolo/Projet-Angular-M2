import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Output() search = new EventEmitter<any>();

  departure: string = '';
  arrival: string = '';
  departureDate: string = '';
  passengers: number = 1;

  onSearch(): void {
    this.search.emit({
      departure: this.departure,
      arrival: this.arrival,
      departureDate: this.departureDate,
      passengers: this.passengers
    });
  }
}
