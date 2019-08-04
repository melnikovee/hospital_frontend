import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user-service.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent {
  user = new User('', '', '', '', '', '', '');
  receivedUser!: User;
  done!: boolean;
  alreadyExists!: boolean;
  hide = true;
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9].{2,32}'),
    Validators.maxLength(32)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9].{7,32}')
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  middleNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(64)
  ]);

  adminForm = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    middleName: this.middleNameFormControl,
    email: this.emailFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {}

  putData() {
    this.user.login = this.adminForm.controls.login.value;
    this.user.password = this.adminForm.controls.password.value;
    this.user.firstName = this.adminForm.controls.firstName.value;
    this.user.lastName = this.adminForm.controls.lastName.value;
    this.user.middleName = this.adminForm.controls.middleName.value;
    this.user.email = this.adminForm.controls.email.value;
    this.user.role = 'ADMINISTRATOR';
  }

  onSubmit() {
    this.putData();
    this.alreadyExists = false;
    this.done = false;
    this.userService.save(this.user).subscribe(
        (data: User) => {
          this.receivedUser = data;
          this.done = true;
        },
        error => {
          this.alreadyExists = true;
          console.log(error);
        }
    );
  }
}

