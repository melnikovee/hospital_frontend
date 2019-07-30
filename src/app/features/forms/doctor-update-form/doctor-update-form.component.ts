import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../_models/user';
import {Doctor} from '../../_models/doctor';
import {DoctorService} from '../../_services/doctor-service.service';
import {UserService} from '../../_services/user-service.service';


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
export class DoctorUpdateFormComponent implements OnInit {
  user = new User('', '', '', '', '', '', '');
  doctor = new Doctor('');
  currentUser!: User;
  currentDoctor!: Doctor;
  id!: number;

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
    Validators.maxLength(32)
  ]);

  docForm = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: this.middleNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }

    this.doctorService.getDoctorById(this.id).subscribe(data => {
      this.currentDoctor = data;
      console.log(this.currentDoctor);
    });

    this.userService.getUserById(this.id).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }

  putData() {

    let changedData = this.docForm.controls.firstName.value;
    this.user.firstName = changedData === '' ? this.currentUser.firstName : changedData;

    changedData = this.docForm.controls.lastName.value;
    this.user.lastName = changedData === '' ? this.currentUser.lastName : changedData;

    changedData = this.docForm.controls.middleName.value;
    this.user.middleName = changedData === '' ? this.currentUser.middleName : changedData;

    changedData = this.docForm.controls.email.value;
    this.user.email = changedData === '' ? this.currentUser.email : changedData;

    changedData = this.docForm.controls.phone.value;
    this.doctor.phone = changedData === '' ? this.currentDoctor.phone : changedData;
  }

  onSubmit() {
    this.putData();

    console.log(this.user);
    console.log(this.doctor);

    this.userService.updateUser(this.id, this.user).subscribe();
    this.doctorService.updateDoctor(this.id, this.doctor).subscribe();
  }
}
