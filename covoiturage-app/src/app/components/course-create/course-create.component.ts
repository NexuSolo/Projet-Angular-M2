import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent {
  departureForm: FormGroup = new FormGroup({
    departureCountry: new FormControl(''),
    departureCity: new FormControl(''),
    departureAddress: new FormControl(''),
    departureDate: new FormControl('')
  });

  arrivalForm: FormGroup = new FormGroup({
    arrivalCountry: new FormControl(''),
    arrivalCity: new FormControl(''),
    arrivalAddress: new FormControl(''),
    arrivalDate: new FormControl('')
  });

  informationForm: FormGroup = new FormGroup({
    seats: new FormControl(''),
    price: new FormControl('')
  });

  onSubmit(): void {
    const departureData = this.departureForm.value;
    const arrivalData = this.arrivalForm.value;
    const informationData = this.informationForm.value;

    console.log('Departure Data:', departureData);
    console.log('Arrival Data:', arrivalData);
    console.log('Information Data:', informationData);
  }
}
