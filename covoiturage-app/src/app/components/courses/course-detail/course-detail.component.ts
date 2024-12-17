import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  isLoading: boolean = true;
  courseId!: number;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.getCourse();
    });
  }

  getCourse(): void {
    this.courseService.getCourse(this.courseId).subscribe((course: Course) => {
      this.course = course;
      this.isLoading = false;
    });
  }
}
