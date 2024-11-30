import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @Input() itemsPerPage: number = 1;
  @Input() pagination: boolean = true;
  courses: Course[] = [];
  paginatedCourses: Course[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.totalPages = Math.ceil(courses.length / this.itemsPerPage);
      this.updatePaginatedCourses();
    });
  }

  updatePaginatedCourses(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCourses();
    }
  }

  onSearch(criteria: Search): void {
    this.courseService
      .searchCourses(
        criteria.departure,
        criteria.arrival,
        criteria.departureDate,
        criteria.passengers
      )
      .subscribe((courses) => {
        this.courses = courses;
        this.totalPages = Math.ceil(courses.length / this.itemsPerPage);
        this.updatePaginatedCourses();
      });
  }
}
