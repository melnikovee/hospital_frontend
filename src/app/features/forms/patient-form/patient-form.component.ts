import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
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
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnDestroy {
  user = new User('', '', '', '', '', '', '');
  patient = new Patient('', '');
  receivedUser!: User;
  done!: boolean;
  alreadyExists!: boolean;
  startDate = new Date(1970, 1, 1);
  hide = true;
  private userSub = Subscription.EMPTY;
  private patientSub = Subscription.EMPTY;

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9].{2,32}'),
    Validators.maxLength(32)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9].{7,32}')
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);
  middleNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);
  phoneFormControl = new FormControl('', [
    Validators.pattern('[0-9]{1,32}'),
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(64)
  ]);

  birthdayFormControl = new FormControl('', [
    Validators.required
  ]);

  patientForm = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: this.middleNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl,
    birthday: this.birthdayFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService, private userService: UserService) {}

  putData() {
    this.user.login = this.patientForm.controls.login.value;
    this.user.password = this.patientForm.controls.password.value;
    this.user.firstName = this.patientForm.controls.firstName.value;
    this.user.lastName = this.patientForm.controls.lastName.value;
    this.user.middleName = this.patientForm.controls.middleName.value;
    this.user.email = this.patientForm.controls.email.value;
    this.patient.phone = this.patientForm.controls.phone.value;
    this.patient.birthday = this.patientForm.controls.birthday.value;
    this.user.role = 'PATIENT';
  }

  onSubmit() {
    this.putData();
    this.alreadyExists = false;
    this.done = false;
    this.patientSub = this.userService.createPatient(this.user).subscribe(
        (data: User) => {
          this.patient.id = data.id;
          this.receivedUser = data;
          this.done = true;
          this.userSub = this.patientService.save(this.patient).subscribe(
            error => console.log(error));
        },
      error => {
        this.alreadyExists = true;
        console.log(error);
      }
        );
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.patientSub.unsubscribe();
  }
}
