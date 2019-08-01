import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../../core/auth/currentuser-service.service';
import {Router} from '@angular/router';
import {UserService} from '../../_services/user-service.service';
import {ReplaySubject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-password-change-dialog-form',
  templateUrl: './password-change-dialog-form.component.html',
  styleUrls: ['./password-change-dialog-form.component.css']
})
export class PasswordChangeDialogFormComponent implements OnInit {

  bindingCurrentPassword!: string;
  bindingNewPassword!: string;
  bindingRepeatedPassword!: string;
  isCurrentPasswordSent!: boolean;
  isCurrentPasswordRight!: boolean;
  enableChange!: boolean;
  isDone!: boolean;
  newPassword = '';
  repeatedPassword = '';
  textCurrentPassword$: ReplaySubject<string> = new ReplaySubject<string>();
  textNewPassword$: ReplaySubject<string> = new ReplaySubject<string>();
  textRepeatedPassword$: ReplaySubject<string> = new ReplaySubject<string>();

  constructor(private currentUserService: CurrentUserService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.textCurrentPassword$.pipe(distinctUntilChanged(), debounceTime(600)).subscribe(text => {
      this.checkPassword(text);
    });

    this.textNewPassword$.pipe(distinctUntilChanged(), debounceTime(400)).subscribe(text => {
      this.newPassword = text;
      this.permitChange();
    });

    this.textRepeatedPassword$.pipe(distinctUntilChanged(), debounceTime(400)).subscribe(text => {
      this.repeatedPassword = text;
      this.permitChange();
    });
  }

  triggerCurrentPassword() {
    this.textCurrentPassword$.next(this.bindingCurrentPassword);
  }

  triggerNewPassword() {
    this.textNewPassword$.next(this.bindingNewPassword);
  }

  triggerRepeatedPassword() {
    this.textRepeatedPassword$.next(this.bindingRepeatedPassword);
  }

  checkPassword(text: string) {
    this.isDone = false;
    const login = localStorage.getItem('login');

    if (login) {
      this.currentUserService.checkPassword(login, text).subscribe(res => {
        this.isCurrentPasswordSent = true;
        this.isCurrentPasswordRight = res;
      });
    }
  }

  changePassword() {
    const id = localStorage.getItem('id');

    if (id && this.isCurrentPasswordRight) {
      this.userService.changePassword(parseInt(id, 10), this.newPassword).subscribe(data => {
        this.isDone = true;
      });
      this.isCurrentPasswordRight = false;
      this.enableChange = false;
    }
  }

  permitChange() {
    this.enableChange = (this.newPassword.length !== 0) && (this.repeatedPassword.length !== 0)
      && (this.newPassword === this.repeatedPassword);
  }
}
