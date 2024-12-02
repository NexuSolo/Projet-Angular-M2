import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CoursesComponent } from '../courses/courses.component';
import { CourseService } from 'src/app/core/services/course.service';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, SearchbarComponent, CoursesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        CourseService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              departure: 'Paris',
              arrival: 'Lyon',
              departureDate: '2023-10-01',
              passengers: 2
            })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
