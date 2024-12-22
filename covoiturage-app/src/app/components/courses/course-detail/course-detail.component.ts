import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  isLoading: boolean = true;
  courseId!: number;

  currentUser: any = {};

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.getCourse();
    });

    this.currentUser = await this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  getCourse(): void {
    this.courseService.getCourse(this.courseId).subscribe((course: Course) => {
      this.course = course;
      this.isLoading = false;
    });
  }

  joinCourse() {
    console.log(this.currentUser.id);
    console.log(this.course.id);
    const currentUser = this.authService.getCurrentUser();
    if (this.course.id !== undefined) {
      console.log('add participant');
      this.courseService.addParticipant(this.course.id, this.currentUser).subscribe(response => {});
    }

    this.router.navigate(['/profil']);
  }

  alreadyJoined(): boolean {
    if (this.course.passengers) {
      return this.course.passengers.some((passenger: any) => passenger.id === this.currentUser.id);
    }
    return false;
  }

  deleletCourse() {
    console.log('delete course');
    if (this.course.id !== undefined) {
      this.courseService.deleteCourse(this.course.id).subscribe(response => {
      });
    }
    this.router.navigate(['/profil']);

  }
}
