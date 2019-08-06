import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../../core/auth/currentuser-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  username!: string;
  password!: string;
  notExists!: boolean;
  hide = true;
  private currentUserSub = Subscription.EMPTY;

  constructor(private currentUserService: CurrentUserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleLoginClick() {
    this.currentUserSub = this.currentUserService.authenticate(
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

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
