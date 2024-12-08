import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})

export class CourseDetailComponent implements OnInit {
  course: any;
  isLoading: boolean = true; // Ajoutez cette ligne
  courseId : number = 1;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.getCourse();
    });
  }

  getCourse() {
    this.courseService.getCourse(this.courseId).subscribe((course) => {
      this.course = course;
      this.isLoading = false;
      console.log(this.course);
    });
  }
}
