import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { State } from 'src/app/models/enum/state.enum';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent {
  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  departureForm: FormGroup = new FormGroup({
    departureCountry: new FormControl('', Validators.required),
    departureCity: new FormControl('', Validators.required),
    departureAddress: new FormControl('', Validators.required),
    departureDate: new FormControl('', [Validators.required, this.dateValidator])
  });

  arrivalForm: FormGroup = new FormGroup({
    arrivalCountry: new FormControl('', Validators.required),
    arrivalCity: new FormControl('', Validators.required),
    arrivalAddress: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', [Validators.required, this.dateValidator])
  });

  informationForm: FormGroup = new FormGroup({
    seats: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(0)])
  });

  courseForm: FormGroup = new FormGroup(
    {
      departure: this.departureForm,
      arrival: this.arrivalForm,
      information: this.informationForm
    },
    { validators: this.dateComparisonValidator }
  );

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const course: Course = {
      departure: {
        country: this.departureForm.value.departureCountry,
        city: this.departureForm.value.departureCity,
        address: this.departureForm.value.departureAddress
      },
      arrival: {
        country: this.arrivalForm.value.arrivalCountry,
        city: this.arrivalForm.value.arrivalCity,
        address: this.arrivalForm.value.arrivalAddress
      },
      departureDate: this.departureForm.value.departureDate,
      arrivalDate: this.arrivalForm.value.arrivalDate,
      price: this.informationForm.value.price,
      seats: this.informationForm.value.seats,
      driver: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '0123456789',
        birthDate: '1990-01-01'
      },
      passengers: [],
      state: State.UPCOMING
    };

    this.courseService.createCourse(course).subscribe({
      next: () => {
        alert('Course created successfully');
        this.router.navigate(['/']);
      },
      error: error => {
        console.error('Error creating course', error);
      }
    });
  }

  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: 'La date est invalide' };
    }
    return null;
  }

  private dateComparisonValidator(group: AbstractControl): ValidationErrors | null {
    const departureDate = group.get('departure.departureDate')?.value;
    const arrivalDate = group.get('arrival.arrivalDate')?.value;
    if (departureDate && arrivalDate && new Date(departureDate) >= new Date(arrivalDate)) {
      return { dateMismatch: "La date de départ doit être avant la date d'arrivée." };
    }
    return null;
  }
}
