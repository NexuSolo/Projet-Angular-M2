import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CourseService } from '../../services/course.service'; // Adjust the path as necessary


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {


  isLoggedIn: boolean = false;
  currentUser: any = {};
  trajets: any[] = [];
  
  constructor(private authService: AuthService, private courseService: CourseService) {}

  async ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.currentUser = await this.authService.getCurrentUser();
    }
    console.log(this.currentUser);
    this.getTrajets();
  }

  async getTrajets() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.trajets = data;
      console.log(this.trajets);
    });

  }






}
