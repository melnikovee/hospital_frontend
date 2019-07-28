import { Component, OnInit } from '@angular/core';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {PatientTimeslot} from '../../_models/patient-timeslot';

@Component({
  selector: 'app-patients-past-visits-form',
  templateUrl: './patients-past-visits-form.component.html',
  styleUrls: ['./patients-past-visits-form.component.css']
})
export class PatientsPastVisitsFormComponent implements OnInit {

  foundPatientTimeslots!: PatientTimeslot[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time'];

  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {

    let id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      id = parseInt(stringId, 10);
    }

    this.timeslotService.getPastTimeslotsByPatient(id).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }
}
