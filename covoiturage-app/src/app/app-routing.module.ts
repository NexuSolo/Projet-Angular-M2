import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from './core/guards/user.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: SearchResultsComponent },
  { path: '', component: HomeComponent, canActivate: [userGuard] },
  { path: 'create', component : CourseCreateComponent, canActivate: [userGuard] },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule]
})
export class AppRoutingModule {}
