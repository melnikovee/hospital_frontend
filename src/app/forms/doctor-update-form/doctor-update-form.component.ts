import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Doctor} from '../../models/doctor';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from '../../services/doctor-service.service';
import {UserService} from '../../services/user-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-doctor-update-form',
  templateUrl: './doctor-update-form.component.html',
  styleUrls: ['./doctor-update-form.component.css']
})
export class DoctorUpdateFormComponent implements OnInit{

  user: User;
  doctor: Doctor;
  currentUser!: User;
  currentDoctor!: Doctor;

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

  docForm = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: new FormControl(),
    phone: this.phoneFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService, private userService: UserService) {
    this.user = new User();
    this.doctor = new Doctor();
  }

  ngOnInit(): void {
    this.doctorService.getDoctorById(15).subscribe(data => {
      this.currentDoctor = data;
      console.log(this.currentDoctor);
    });

    this.userService.getUserById(15).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }

  putData() {

    let changedData = this.docForm.get('firstName')!.value;
    this.user.firstName = changedData === '' ? this.currentUser.firstName : changedData;

    changedData = this.docForm.get('lastName')!.value;
    this.user.lastName = changedData === '' ? this.currentUser.lastName : changedData;

    changedData = this.docForm.get('middleName')!.value;
    this.user.middleName = changedData === '' ? this.currentUser.middleName : changedData;

    changedData = this.docForm.get('email')!.value;
    this.user.email = changedData === '' ? this.currentUser.email : changedData;

    changedData = this.docForm.get('phone')!.value;
    this.doctor.phone = changedData === '' ? this.currentDoctor.phone : changedData;
  }

  onSubmit() {
    this.putData();

    console.log(this.user);
    console.log(this.doctor);

    this.userService.updateUser(15, this.user).subscribe();
    this.doctorService.updateDoctor(15, this.doctor).subscribe();
  }
}
