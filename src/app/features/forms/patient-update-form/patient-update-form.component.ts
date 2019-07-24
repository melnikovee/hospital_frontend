import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../_models/user';
import {Patient} from '../../_models/patient';
import {PatientService} from '../../_services/patient-service.service';
import {UserService} from '../../_services/user-service.service';


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
export class PatientUpdateFormComponent implements OnInit {
  private user = new User('', '', '', '', '', '');
  private patient = new Patient('', '');
  private currentUser!: User;
  private currentPatient!: Patient;

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
              private patientService: PatientService, private userService: UserService) {}

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

    let changedData = this.patientForm.controls.firstName.value;
    this.user.firstName = changedData === '' ? this.currentUser.firstName : changedData;

    changedData = this.patientForm.controls.lastName.value;
    this.user.lastName = changedData === '' ? this.currentUser.lastName : changedData;

    changedData = this.patientForm.controls.middleName.value;
    this.user.middleName = changedData === '' ? this.currentUser.middleName : changedData;

    changedData = this.patientForm.controls.email.value;
    this.user.email = changedData === '' ? this.currentUser.email : changedData;

    changedData = this.patientForm.controls.phone.value;
    this.patient.phone = changedData === '' ? this.currentPatient.phone : changedData;
    this.patient.birthday = this.currentPatient.birthday;
  }

  onSubmit() {
    this.putData();

    this.userService.updateUser(23, this.user).subscribe();
    this.patientService.updatePatient(23, this.patient).subscribe();
  }
}
