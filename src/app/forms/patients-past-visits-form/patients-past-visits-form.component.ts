import { Component, OnInit } from '@angular/core';
import {TimeslotService} from '../../services/timeslot-service.service';
import {PatientTimeslot} from '../../models/patient-timeslot';

@Component({
  selector: 'app-patients-past-visits-form',
  templateUrl: './patients-past-visits-form.component.html',
  styleUrls: ['./patients-past-visits-form.component.css']
})
export class PatientsPastVisitsFormComponent implements OnInit {

  foundPatientTimeslots: PatientTimeslot[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time'];
  hardcodedPatient: 5;

  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {
    this.timeslotService.getPastTimeslotsByPatient(this.hardcodedPatient).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }
}
