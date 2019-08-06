import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../features/_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../features/_services/user-service.service';
import {PatientService} from '../../../features/_services/patient-service.service';
import {DoctorService} from '../../../features/_services/doctor-service.service';
import {Doctor} from '../../../features/_models/doctor';
import {Patient} from '../../../features/_models/patient';
import {PasswordChangeDialogFormComponent} from '../../../features/forms/password-change-dialog-form/password-change-dialog-form.component';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';

export interface Section {
  name: string;
  value: string;
}

@Component({
  selector: 'app-homepage-form',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  user!: User;
  doctor!: Doctor;
  patient!: Patient;
  id!: number;
  currentRole!: string | null;
  usersData: Section[] = [];
  doctorsData: Section[] = [];
  patientsData: Section[] = [];
  private sub = Subscription.EMPTY;
  private doctorSub = Subscription.EMPTY;
  private patientSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private patientService: PatientService,
              private doctorService: DoctorService, private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.id = -1;
    const stringId = localStorage.getItem('id');
    if (stringId) {
      this.id = parseInt(stringId, 10);
    } else {
      this.navigateToLoginPage();
    }
    this.currentRole = localStorage.getItem('role');
    this.sub = this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      this.usersData = [
        {
          name: 'Логин',
          value: this.user.login,
        },
        {
          name: 'E-mail',
          value: this.user.email,
        },
        {
          name: 'ФИО',
          // tslint:disable-next-line
          value: this.user.middleName == null ? this.user.lastName + ' ' + this.user.firstName :
            this.user.lastName + ' ' + this.user.firstName + ' ' + this.user.middleName,
        }
      ];
    });
    if (this.currentRole === 'DOCTOR') {
      this.doctorSub = this.doctorService.getDoctorById(this.id).subscribe(data => {
        this.doctor = data;
        this.doctorsData = [
          {
            name: 'Телефон',
            value: this.doctor.phone,
          }
        ];
      });
      // this.sub.add(doctorSub);
    }
    if (this.currentRole === 'PATIENT') {
      this.patientSub = this.patientService.getPatientById(this.id).subscribe(data => {
        this.patient = data;
        this.patientsData = [
          {
            name: 'Телефон',
            value: this.patient.phone,
          },
          {
            name: 'Дата рождения',
            value: this.patient.birthday,
          }
        ];
      });
      // this.sub.add(patientSub);
    }
  }

  openDialog() {
    this.dialog.open(PasswordChangeDialogFormComponent, {width: '50%'});
  }
  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.doctorSub.unsubscribe();
    this.patientSub.unsubscribe();
    this.sub.unsubscribe();
  }
}
