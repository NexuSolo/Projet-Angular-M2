import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Output() search = new EventEmitter<Search>();

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      departureDate: new FormControl(''),
      passengers: new FormControl(1)
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const search = this.searchForm.value;
      if (search.departure === '') {
        delete search.departure;
      }
      if (search.arrival === '') {
        delete search.arrival;
      }
      if (search.departureDate === '') {
        delete search.departureDate;
      }
      this.search.emit(search);
    }
  }
}
