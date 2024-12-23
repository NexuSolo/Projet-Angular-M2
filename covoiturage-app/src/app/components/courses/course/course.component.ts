import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  constructor(private router: Router) {}
  @Input() course!: Course;

  getDuration(departureDate: Date, arrivalDate: Date): string {
    const diff = new Date(arrivalDate).getTime() - new Date(departureDate).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  goToCourseDetail(courseId: number) {
    this.router.navigate([`/course/${courseId}`]);
  }
}
