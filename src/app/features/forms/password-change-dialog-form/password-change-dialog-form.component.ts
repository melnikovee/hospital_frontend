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

  binding!: string;
  isCurrentPasswordSent!: boolean;
  isCurrentPasswordRight!: boolean;
  isDone!: boolean;
  newPassword!: string;
  repeatedPassword!: string;
  text$: ReplaySubject<string> = new ReplaySubject<string>();

  constructor(private currentUserService: CurrentUserService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.text$.pipe(distinctUntilChanged(), debounceTime(600)).subscribe(text => {
      console.log(text);
      this.checkPassword(text);
    });
  }

  trigger() {
    this.text$.next(this.binding);
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
    }
  }

  permitChange(): boolean {
    return this.newPassword !== undefined && this.repeatedPassword !== undefined
      && this.newPassword === this.repeatedPassword;
  }
}
