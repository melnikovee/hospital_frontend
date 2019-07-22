import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient-service.service';

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
export class PatientFormComponent {

  user: User;
  patient: Patient;
  startDate = new Date(1970, 1, 1);

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(88)
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('[0-9]{1,11}'),
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(32)
  ]);

  birthdayFormControl = new FormControl('', [
    Validators.required
  ]);

  patientForm = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: new FormControl(),
    phone: this.phoneFormControl,
    email: this.emailFormControl,
    birthday: this.birthdayFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService, private userService: UserService) {
    this.user = new User();
    this.patient = new Patient();
  }

  putData() {
    this.user.login = this.patientForm.get('login').value;
    this.user.password = this.patientForm.get('password').value;
    this.user.firstName = this.patientForm.get('firstName').value;
    this.user.lastName = this.patientForm.get('lastName').value;
    this.user.middleName = this.patientForm.get('middleName').value;
    this.user.email = this.patientForm.get('email').value;
    this.patient.phone = this.patientForm.get('phone').value;
    this.patient.birthday = this.patientForm.get('birthday').value;
    this.user.role = 'PATIENT';
  }

  onSubmit() {
    this.putData();
    this.userService.save(this.user).subscribe(
        (data: User) => {
          this.patient.id = data.id;
          this.patientService.save(this.patient).subscribe(result => this.gotoUserList());
        },
        error => console.log(error)
    );

  }

  gotoUserList() {
    this.router.navigate(['/patients']);
  }

}
