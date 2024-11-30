import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/courses/course/course.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, ProfilComponent, FooterComponent, HeaderComponent, CoursesComponent, CourseComponent, CourseDetailComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
