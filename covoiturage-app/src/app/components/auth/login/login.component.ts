import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .subscribe((user: User[]) => {
        if (user.length === 0) {
          alert('User or password incorrect');
          return;
        }
        this.authService.saveUser(user[0]);
        this.router.navigate(['/']);
      });
  }
}
