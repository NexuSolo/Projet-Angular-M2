import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { State } from 'src/app/models/enum/state.enum';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map((courses) =>
        courses
          .filter((course) => {
            const now = new Date();
            const departureDate = new Date(course.departureDate);
            const arrivalDate = new Date(course.arrivalDate);
            return (
              departureDate > now ||
              (departureDate <= now && arrivalDate >= now)
            );
          })
          .sort(
            (a, b) =>
              new Date(a.departureDate).getTime() -
              new Date(b.departureDate).getTime()
          )
      )
    );
  }

  searchCourses(
    departure: string,
    arrival: string,
    departureDate: string,
    passengers: number
  ): Observable<Course[]> {
    let params = new HttpParams();
    if (departure) {
      params = params.set('departure.city', departure);
    }
    if (arrival) {
      params = params.set('arrival.city', arrival);
    }
    if (departureDate) {
      params = params.set('departureDate', departureDate);
    }

    return this.http
      .get<Course[]>(this.apiUrl, { params })
      .pipe(
        map((courses) =>
          courses.filter(
            (course) => course.seats - course.passengers.length >= passengers
          )
        )
      );
  }
}
