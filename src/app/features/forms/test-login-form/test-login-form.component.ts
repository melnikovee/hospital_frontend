import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user-service.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Router} from '@angular/router';
import {CurrentUser} from '../../_models/current-user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {delay} from 'rxjs/operators';

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

  currentUser = new CurrentUser('', '', '');

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

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit() {
    const login = this.loginForm.controls.login.value;
    const password = this.loginForm.controls.password.value;
    this.userService.login(login, password);
    this.reloadData();
    this.navigateByRole();
  }

  reloadData() {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      this.currentUser.login = helper.decodeToken(token).sub;
      this.currentUser.id = localStorage.getItem('id');
      this.currentUser.role = localStorage.getItem('role');
    }
  }

  logout() {
    localStorage.clear();
    this.currentUser.login = 'отсутствует';
  }

  ngOnInit(): void {
    this.reloadData();
  }
  async navigateByRole() {
    await this.sleep(3000);
    const role = localStorage.getItem('role');
    if (role === 'ADMINISTRATOR') {
      this.router.navigate(['/admin']);
    }
    if (role === 'DOCTOR') {
      this.router.navigate(['/doctor']);
    }
    if (role === 'PATIENT') {
      this.router.navigate(['/patient']);
    }
  }

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }
}
