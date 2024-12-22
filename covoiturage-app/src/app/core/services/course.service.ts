import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient, private authService : AuthService) {}

  getCourses(): Observable<Course[]> {
    const now = new Date();
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map(courses =>
        courses
          .filter(course => {
            const departureDate = new Date(course.departureDate);
            const arrivalDate = new Date(course.arrivalDate);
            return departureDate > now || (departureDate <= now && arrivalDate >= now);
          })
          .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())
      )
    );
  }

  searchCourses(
    departure: string | undefined,
    arrival: string | undefined,
    departureDate: string | undefined,
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
      .pipe(map(courses => courses.filter(course => course.seats - course.passengers.length >= passengers)));
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCoursesByDriver(driverId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?driver.id=${driverId}`);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/${id}`);
  }

  addParticipant(courseId: number, user: User): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`).pipe(
        switchMap(course => {
            const updatedPassengers = [...course.passengers, user];
            return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, {
                passengers: updatedPassengers
            });
        })
    );
}
}
