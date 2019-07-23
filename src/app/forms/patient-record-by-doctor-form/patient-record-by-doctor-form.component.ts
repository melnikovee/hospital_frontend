import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Timeslot} from '../../models/timeslot';
import {TimeslotService} from '../../services/timeslot-service.service';
import {ErrorStateMatcher} from '@angular/material';
import {UserService} from '../../services/user-service.service';
import {PatientFullName} from '../../models/patient-full-name';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-patient-record-by-doctor-form',
  templateUrl: './patient-record-by-doctor-form.component.html',
  styleUrls: ['./patient-record-by-doctor-form.component.css']
})
export class PatientRecordByDoctorFormComponent implements OnInit {

  foundPatients: PatientFullName[];
  lastName: string;
  displayedColumns: string[] = ['patient', 'birthday', 'record'];
  isGetPatients: boolean;
  timeSlotsForCheck: Timeslot[];

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private timeslotService: TimeslotService, private userService: UserService) {
  }

  onSubmit() {
    this.lastName = this.spForm.get('lastName').value;
    this.isGetPatients = false;

    this.userService.getPatientsByLastName(this.lastName).subscribe(data => {
      this.foundPatients = data;

      if (data.length !== 0) {
        this.isGetPatients = true;
      }
    });
  }

  ngOnInit(): void {
    this.timeslotService.getTimeslotsForRecord(1).subscribe(data => {
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
}
