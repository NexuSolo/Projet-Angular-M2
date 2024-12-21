import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

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

  login() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((user: any) => {
      if (user.length === 0) {
        this.errorMessage = 'Le nom d\'utilisateur ou le mot de passe est incorrect';
        return;
      }
      this.authService.user = user[0];
      if (!this.authService.user) {
        this.errorMessage = 'Le nom d\'utilisateur ou le mot de passe est incorrect';
        return;
      }
      this.errorMessage = '';
      this.authService.saveUser();
      this.router.navigate(['/']);
    });
  }
}
