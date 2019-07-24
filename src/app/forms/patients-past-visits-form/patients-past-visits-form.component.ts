import { Component, OnInit } from '@angular/core';
import {TimeslotService} from '../../services/timeslot-service.service';
import {PatientTimeslots} from '../../models/patient-timeslots';

@Component({
  selector: 'app-patients-past-visits-form',
  templateUrl: './patients-past-visits-form.component.html',
  styleUrls: ['./patients-past-visits-form.component.css']
})
export class PatientsPastVisitsFormComponent implements OnInit {

  foundPatientTimeslots: PatientTimeslots[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time'];

  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {
    this.timeslotService.getTimeslotsByPatient(4).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }
}
