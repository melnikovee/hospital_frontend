import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-update-form',
  templateUrl: './admin-update-form.component.html',
  styleUrls: ['./admin-update-form.component.css']
})
export class AdminUpdateFormComponent implements OnInit{

  user: User;
  currentUser: User;

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.maxLength(32)
  ]);

  adminForm = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: new FormControl(),
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.userService.getUserById(13).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }

  putData() {

    let changedData = this.adminForm.get('firstName').value;
    this.user.firstName = changedData === '' ? this.currentUser.firstName : changedData;

    changedData = this.adminForm.get('lastName').value;
    this.user.lastName = changedData === '' ? this.currentUser.lastName : changedData;

    changedData = this.adminForm.get('middleName').value;
    this.user.middleName = changedData === '' ? this.currentUser.middleName : changedData;

    changedData = this.adminForm.get('email').value;
    this.user.email = changedData === '' ? this.currentUser.email : changedData;
  }

  onSubmit() {
    this.putData();

    console.log(this.user);

    this.userService.updateUser(13, this.user).subscribe();
  }
}
