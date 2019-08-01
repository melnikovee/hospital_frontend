import {Component, OnInit} from '@angular/core';
import {User} from '../../../features/_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../features/_services/user-service.service';
import {PatientService} from '../../../features/_services/patient-service.service';
import {DoctorService} from '../../../features/_services/doctor-service.service';
import {Doctor} from '../../../features/_models/doctor';
import {Patient} from '../../../features/_models/patient';

export interface Section {
  name: string;
  value: string;
}

@Component({
  selector: 'app-homepage-form',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user!: User;
  doctor!: Doctor;
  patient!: Patient;
  id!: number;
  currentRole!: string | null;
  usersData: Section[] = [];
  doctorsData: Section[] = [];
  patientsData: Section[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private patientService: PatientService,
              private doctorService: DoctorService) {
  }

  async ngOnInit() {
    this.id = -1;
    const stringId = localStorage.getItem('id');
    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
    this.currentRole = localStorage.getItem('role');
    console.log(this.currentRole);
    this.userService.getUserById(this.id).subscribe(data => {
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
          value: this.user.middleName == null ? this.user.lastName + ' ' + this.user.firstName :
            this.user.lastName + ' ' + this.user.firstName + ' ' + this.user.middleName,
        }
      ];
    });
    if (this.currentRole === 'DOCTOR') {
      this.doctorService.getDoctorById(this.id).subscribe(data => {
        this.doctor = data;
        this.doctorsData = [
          {
            name: 'Телефон',
            value: this.doctor.phone,
          }
        ];
      });
    }
    if (this.currentRole === 'PATIENT') {
      this.patientService.getPatientById(this.id).subscribe(data => {
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
    }
  }
}
