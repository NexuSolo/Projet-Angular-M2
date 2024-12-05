import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  user: User = {} as User;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {validators: [this.checkPasswords, this.checkAge]});
  }

  checkPasswords(control: FormControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notSame: true };
  }

  checkAge(control: FormControl) {
    const birthDate = new Date(control.get('birthDate')?.value);
    const currentDate = new Date();
    return currentDate.getFullYear() - birthDate.getFullYear() >= 18 ? null : { notOldEnough: true };
  }

  register() : void {
    if (this.registerForm.invalid) return;
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.email = this.registerForm.value.email;
    this.user.phone = this.registerForm.value.phoneNumber
    this.user.birthDate = this.registerForm.value.birthDate;
    this.user.password = this.registerForm.value.password;
    if (this.authService.checkUserExists(this.user.email)) {
      alert('User already exists');
      return;
    }
    this.authService.register(this.user);
    this.router.navigate(['/login']);
  }

  get getErrorLabel() : string {
    if (this.registerForm.errors?.['required']){
      return 'Veuillez remplir tous les champs';
    }  
    if (this.registerForm.controls?.['password']?.errors?.['minlength']) return 'Le mot de passe doit contenir au moins 6 caractères';
    if (this.registerForm.controls?.['email'].touched && this.registerForm.errors?.['email']) return 'Email invalide';
    if (this.registerForm.errors?.['notSame']) return 'Les mots de passe ne correspondent pas';
    if (this.registerForm.controls?.['birthDate'].touched && this.registerForm.errors?.['notOldEnough']) return 'Vous devez avoir au moins 18 ans';
    return '';
  }
}

