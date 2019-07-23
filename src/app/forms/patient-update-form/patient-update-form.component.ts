import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user-service.service';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-patient-update-form',
  templateUrl: './patient-update-form.component.html',
  styleUrls: ['./patient-update-form.component.css']
})
export class PatientUpdateFormComponent implements OnInit{

  user: User;
  patient: Patient;
  currentUser: User;
  currentPatient: Patient;

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('[0-9]{1,11}')
  ]);

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.maxLength(32)
  ]);

  patientForm = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: new FormControl(),
    phone: this.phoneFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService, private userService: UserService) {
    this.user = new User();
    this.patient = new Patient();
  }

  ngOnInit(): void {
    this.patientService.getPatientById(23).subscribe(data => {
      this.currentPatient = data;
      console.log(this.currentPatient);
    });

    this.userService.getUserById(23).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }

  putData() {

    let changedData = this.patientForm.get('firstName').value;
    this.user.firstName = changedData === '' ? this.currentUser.firstName : changedData;

    changedData = this.patientForm.get('lastName').value;
    this.user.lastName = changedData === '' ? this.currentUser.lastName : changedData;

    changedData = this.patientForm.get('middleName').value;
    this.user.middleName = changedData === '' ? this.currentUser.middleName : changedData;

    changedData = this.patientForm.get('email').value;
    this.user.email = changedData === '' ? this.currentUser.email : changedData;

    changedData = this.patientForm.get('phone').value;
    this.patient.phone = changedData === '' ? this.currentPatient.phone : changedData;
    this.patient.birthday = this.currentPatient.birthday;
  }

  onSubmit() {
    this.putData();

    console.log(this.user);
    console.log(this.patient);

    this.userService.updateUser(23, this.user).subscribe();
    this.patientService.updatePatient(23, this.patient).subscribe();
  }
}
