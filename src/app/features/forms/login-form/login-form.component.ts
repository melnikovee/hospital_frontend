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
  username!: string;
  password!: string;

  constructor(private currentUserService: CurrentUserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleLoginClick() {
    this.currentUserService.authenticate(
      this.username,
      this.password
    ).subscribe(() => this.router.navigate(['']));
  }
}
