import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses$ = this.courseService.getCourses();
  }

  onSearch(criteria: any): void {
    const { departure, arrival, departureDate, passengers } = criteria;
    this.courses$ = this.courseService.searchCourses(
      departure,
      arrival,
      departureDate,
      passengers
    );
  }
}
