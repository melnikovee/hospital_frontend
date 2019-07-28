import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user-service.service';
import {LoginInfo} from '../../_models/login-info';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../_services/patient-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-test-login-form',
  templateUrl: './test-login-form.component.html',
  styleUrls: ['./test-login-form.component.css']
})
export class TestLoginFormComponent implements OnInit {

  currentUser!: string;

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(88)
  ]);

  loginForm = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
  });

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService) {
  }

  onSubmit() {
    const login = this.loginForm.controls.login.value;
    const password = this.loginForm.controls.password.value;

    this.userService.login(login, password);
  }

  reloadData() {
    const token = localStorage.getItem('token');

    if (token) {
      const helper = new JwtHelperService();
      this.currentUser = helper.decodeToken(token).sub;
    }
  }

  logout() {
    localStorage.clear();
    this.currentUser = 'отсутствует';
  }

  ngOnInit(): void {
    this.reloadData();
  }
}
