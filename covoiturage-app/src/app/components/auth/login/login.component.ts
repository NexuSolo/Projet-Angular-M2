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

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((user: any) => {
      if (user.length === 0) alert('User or password incorrect');
        this.authService.user = user[0];
        if(!this.authService.user) return;
        this.authService.saveUser();
        this.router.navigate(['/']);
    });
  }


}
