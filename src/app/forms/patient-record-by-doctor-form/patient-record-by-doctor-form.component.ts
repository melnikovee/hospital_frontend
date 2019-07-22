import {Component, OnInit} from '@angular/core';
import {Composite} from '../../models/composite';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Timeslot} from '../../models/timeslot';
import {CompositeService} from '../../services/composite-service.service';
import {TimeslotService} from '../../services/timeslot-service.service';
import {MyErrorStateMatcher} from '../searchpatient-form/searchpatient-form.component';

@Component({
  selector: 'app-patient-record-by-doctor-form',
  templateUrl: './patient-record-by-doctor-form.component.html',
  styleUrls: ['./patient-record-by-doctor-form.component.css']
})
export class PatientRecordByDoctorFormComponent implements OnInit {

  foundPatients: Composite[];
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

  constructor(private compositeService: CompositeService, private timeslotService: TimeslotService) {
  }

  onSubmit() {
    this.lastName = this.spForm.get('lastName').value;

    this.compositeService.getUsersByName(this.lastName).subscribe(data => {
      this.foundPatients = data;
      this.isGetPatients = true;
    });
  }

  ngOnInit(): void {
    this.timeslotService.getTimeslotsForRecord(20).subscribe(data => {
      this.timeSlotsForCheck = data;
      console.log(this.timeSlotsForCheck);
    });
  }

  checkPatient(patient: Composite): boolean {
    for (const timeslot of this.timeSlotsForCheck) {
      if (timeslot.patient === patient.id) {
        return true;
      }
    }
    return false;
  }
}
