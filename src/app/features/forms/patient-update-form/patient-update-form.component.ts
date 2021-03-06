import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../_models/user';
import {Patient} from '../../_models/patient';
import {PatientService} from '../../_services/patient-service.service';
import {UserService} from '../../_services/user-service.service';
import {Subscription} from 'rxjs';


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
export class PatientUpdateFormComponent implements OnInit, OnDestroy {
  user = new User('', '', '', '', '', '', '');
  patient = new Patient('', '');
  currentUser!: User;
  currentPatient!: Patient;
  id!: number;
  private userSub = Subscription.EMPTY;
  private patientSub = Subscription.EMPTY;
  private updateUserSub = Subscription.EMPTY;
  private updatePatientSub = Subscription.EMPTY;

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  middleNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('[0-9]{1,32}')
  ]);

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.maxLength(64)
  ]);

  patientForm = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: this.middleNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }

    this.patientSub = this.patientService.getPatientById(this.id).subscribe(data => {
      this.currentPatient = data;
    });

    this.userSub = this.userService.getUserById(this.id).subscribe(data => {
      this.currentUser = data;
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

    this.updateUserSub = this.userService.updateUser(this.id, this.user).subscribe();
    this.updatePatientSub = this.patientService.updatePatient(this.id, this.patient).subscribe(value => this.navigateToHomepage());
  }
  navigateToHomepage() {
    this.router.navigate(['/home']);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.updateUserSub.unsubscribe();
    this.patientSub.unsubscribe();
    this.updatePatientSub.unsubscribe();
  }
}
