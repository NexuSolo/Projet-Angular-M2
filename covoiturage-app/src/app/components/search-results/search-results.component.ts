import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements AfterViewInit {
  @ViewChild(SearchbarComponent) searchbarComponent!: SearchbarComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchParams: Search = {
        departure: params['departure'],
        arrival: params['arrival'],
        departureDate: params['departureDate'],
        passengers: params['passengers']
      };

      if (!searchParams.passengers) {
        this.router.navigate(['/']);
      } else {
        this.searchbarComponent.searchForm.setValue({
          departure: searchParams.departure || '',
          arrival: searchParams.arrival || '',
          departureDate: searchParams.departureDate || '',
          passengers: searchParams.passengers || 1
        });
        this.searchbarComponent.onSearch();
      }
    });

    this.searchbarComponent.search.subscribe((formValues: Search) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          departure: formValues.departure,
          arrival: formValues.arrival,
          departureDate: formValues.departureDate,
          passengers: formValues.passengers
        },
        queryParamsHandling: 'merge'
      });
    });
  }
}