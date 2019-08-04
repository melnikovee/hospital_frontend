import {Component, OnInit} from '@angular/core';
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
  notExists!: boolean;
  hide = true;

  constructor(private currentUserService: CurrentUserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleLoginClick() {
    this.currentUserService.authenticate(
      this.username,
      this.password
    ).subscribe(() =>
      this.router.navigate(['/home']),
      error => {
        this.notExists = true;
        console.log(error);
      }
    );
  }
}
