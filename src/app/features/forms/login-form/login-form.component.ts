import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../../core/auth/currentuser-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  _loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private currentUserService: CurrentUserService, private router: Router) {
    this._loginForm = fb.group({
      login: fb.control(undefined, [Validators.required]),
      password: fb.control(undefined, [Validators.required])
    });
  }

  ngOnInit() {
  }

  getErrorLogin() {
    return this._loginForm.controls.login.value.hasError('required') ? 'Не может быть пустым' :
      '';
  }

  getErrorPassword() {
    return this._loginForm.controls.password.value.hasError('required') ? 'Не может быть пустым' :
      '';
  }

  handleLoginClick() {
    this.currentUserService.authenticate(
      this._loginForm.controls.login.value,
      this._loginForm.controls.password.value
    ).subscribe(() => this.router.navigate(['']));
  }
}
