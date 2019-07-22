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

  user: User;
  doctor: Doctor;
  specialties!: Specialty[];
  selectedSpecialtiesFormControl = new FormControl();
  selectedSpecialties!: Specialty[];
  receivedUser!: User;
  done!: boolean;

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
              private specialtyService: SpecialtyService, private doctorSpecialtyService: DoctorSpecialtyService) {
    this.user = new User();
    this.doctor = new Doctor();
  }

  putData() {
    this.user.login = this.docForm.get('login')!.value;
    this.user.password = this.docForm.get('password')!.value;
    this.user.firstName = this.docForm.get('firstName')!.value;
    this.user.lastName = this.docForm.get('lastName')!.value;
    this.user.middleName = this.docForm.get('middleName')!.value;
    this.user.email = this.docForm.get('email')!.value;
    this.doctor.phone = this.docForm.get('phone')!.value;
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
