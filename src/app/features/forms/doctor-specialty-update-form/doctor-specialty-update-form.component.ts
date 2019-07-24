import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {DoctorFullName} from '../../_models/doctor-full-name';
import {Specialty} from '../../_models/specialty';
import {DoctorSpecialtyService} from '../../_services/doctorspecialty-service.service';
import {UserService} from '../../_services/user-service.service';
import {SpecialtyService} from '../../_services/specialty-service.service';
import {DoctorSpecialty} from '../../_models/doctorspecialty';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-doctor-specialty-update-form',
  templateUrl: './doctor-specialty-update-form.component.html',
  styleUrls: ['./doctor-specialty-update-form.component.css']
})
export class DoctorSpecialtyUpdateFormComponent {

  foundDoctors!: DoctorFullName[];
  lastName!: string;
  doctorsColumns: string[] = ['doctor', 'specialties'];
  specialtiesColumns: string[] = ['specialtyName', 'duration', 'specialties'];
  isGetDoctors!: boolean;
  isGetSelectedDoctor!: boolean;
  doctorSpecialties!: Specialty[];
  selectedDoctor!: DoctorFullName;
  allSpecialties: Specialty[] = [];
  addingSpecialties: FormControl = new FormControl();

  lastNameFormControl = new FormControl('', [
    Validators.pattern('[A-Z][a-z]{1,31}'),
    Validators.required
  ]);

  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private specialtyService: SpecialtyService, private userService: UserService,
              private doctorSpecialtyService: DoctorSpecialtyService) {
  }

  onSubmit() {
    this.lastName = this.spForm.controls.lastName.value;
    this.isGetSelectedDoctor = false;

    this.userService.getDoctorsByLastName(this.lastName).subscribe(data => {
      this.foundDoctors = data;

      if (data.length !== 0) {
        this.isGetDoctors = true;
      }
    });
  }

  // tslint:disable-next-line:no-any
  getSpecialties(element: any) {
    this.selectedDoctor = element;
    this.isGetSelectedDoctor = true;

    this.specialtyService.getSpecialtiesByDoctor(element.id).subscribe(data => {
      this.doctorSpecialties = data;
    });
  }

  // tslint:disable-next-line:no-any
  deleteSpecialty(element: any) {
    this.doctorSpecialtyService.deleteOneDoctorSpecialty(this.selectedDoctor.id, element.id).subscribe();
  }

  getAllSpecialties() {
    this.doctorSpecialtyService.getNewSpecialtiesForDoctor(this.selectedDoctor.id).subscribe(data => {
      this.allSpecialties = data;
    });
  }

  putSpecialties() {
    console.log(this.addingSpecialties.value);
    for (const spec of this.addingSpecialties.value) {
      this.doctorSpecialtyService.save(new DoctorSpecialty(this.selectedDoctor.id, spec.id)).subscribe();
    }
  }
}
