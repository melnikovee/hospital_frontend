import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../searchpatient-form/searchpatient-form.component';
import {Timeslot} from '../../_models/timeslot';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {UserService} from '../../_services/user-service.service';
import {PatientFullName} from '../../_models/patient-full-name';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-record-by-doctor-form',
  templateUrl: './patient-record-by-doctor-form.component.html',
  styleUrls: ['./patient-record-by-doctor-form.component.css']
})
export class PatientRecordByDoctorFormComponent implements OnInit {
  displayedColumns: string[] = ['patient', 'birthday', 'record'];
  foundPatients!: PatientFullName[];
  lastName!: string;
  isGetPatients!: boolean;
  timeSlotsForCheck!: Timeslot[];
  id!: number;

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private timeslotService: TimeslotService, private userService: UserService,
              private router: Router) {}

  onSubmit() {
    this.lastName = this.spForm.controls.lastName.value;
    this.isGetPatients = false;

    if (this.lastName !== '') {
      this.userService.getPatientsByLastName(this.lastName).subscribe(data => {
        this.foundPatients = data;

        if (data.length !== 0) {
          this.isGetPatients = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }

    this.timeslotService.getTimeslotsForRecord(this.id).subscribe(data => {
      this.timeSlotsForCheck = data;
    });
  }

  checkPatient(patient: PatientFullName): boolean {
    for (const timeslot of this.timeSlotsForCheck) {
      if (timeslot.patient === patient.id) {
        return true;
      }
    }
    return false;
  }

  makeAppointment(id: number) {
    this.router.navigate(['/makeAppointment', id]);
  }
}
