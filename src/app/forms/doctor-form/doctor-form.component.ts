import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Doctor} from '../../models/doctor';
import {DoctorService} from '../../services/doctor-service.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Specialty} from '../../models/specialty';
import {SpecialtyService} from '../../services/specialty-service.service';
import {DoctorSpecialtyService} from '../../services/doctorspecialty-service.service';
import {DoctorSpecialty} from '../../models/doctorspecialty';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent {
  user = new User('', '', '', '', '', '');
  doctor = new Doctor('');
  receivedUser!: User;
  specialties!: Specialty[];
  selectedSpecialties!: Specialty[];
  done!: boolean;
  selectedSpecialtiesFormControl = new FormControl();
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

  docForm = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: new FormControl(),
    phone: this.phoneFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService, private userService: UserService,
              private specialtyService: SpecialtyService, private doctorSpecialtyService: DoctorSpecialtyService) {}

  putData() {
    this.user.login = this.docForm.controls.login.value;
    this.user.password = this.docForm.controls.password.value;
    this.user.firstName = this.docForm.controls.firstName.value;
    this.user.lastName = this.docForm.controls.lastName.value;
    this.user.middleName = this.docForm.controls.middleName.value;
    this.user.email = this.docForm.controls.email.value;
    this.doctor.phone = this.docForm.controls.phone.value;
    this.user.role = 'DOCTOR';
  }

  getSpecialties() {
    this.specialtyService.findAll().subscribe(
        (data: Specialty[]) => {
          this.specialties = data;
        },
        error => console.log(error)
    );
  }

  onSubmit() {
    this.putData();
    this.userService.save(this.user).subscribe(
        (data: User) => {
          this.doctor.id = data.id;
          this.receivedUser = data;
          this.done = true;
          this.doctorService.save(this.doctor).subscribe((doc: Doctor) => {

            this.selectedSpecialties = this.selectedSpecialtiesFormControl.value;

            for (const spec of this.selectedSpecialties) {
              this.doctorSpecialtyService.save(new DoctorSpecialty(doc.id, spec.id)).subscribe((sp: DoctorSpecialty) => {
              });
            }
          });
        },
        error => console.log(error)
    );
  }
}
