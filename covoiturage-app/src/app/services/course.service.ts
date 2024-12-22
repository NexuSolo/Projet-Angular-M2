import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getCourse(id: number): Observable<Course> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCoursesByDriver(driverId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?driver.id=${driverId}`);
  }
}