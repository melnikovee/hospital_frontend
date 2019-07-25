import { Component, OnInit } from '@angular/core';
import {PatientTimeslot} from '../../_models/patient-timeslot';
import {TimeslotService} from '../../_services/timeslot-service.service';

@Component({
  selector: 'app-patients-current-visits-form',
  templateUrl: './patients-current-visits-form.component.html',
  styleUrls: ['./patients-current-visits-form.component.css']
})
export class PatientsCurrentVisitsFormComponent implements OnInit {

  foundPatientTimeslots!: PatientTimeslot[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time', 'record'];
  hardcodedPatient = 5;

  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {
    this.timeslotService.getCurrentTimeslotsByPatient(this.hardcodedPatient).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }

  cancelRecord(record: PatientTimeslot) {
    this.timeslotService.cancelRecord(record.id).subscribe();
  }
}
