import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {PatientTimeslot} from '../../_models/patient-timeslot';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patients-past-visits-form',
  templateUrl: './patients-past-visits-form.component.html',
  styleUrls: ['./patients-past-visits-form.component.css']
})
export class PatientsPastVisitsFormComponent implements OnInit, OnDestroy {

  foundPatientTimeslots!: PatientTimeslot[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time'];
  private sub = Subscription.EMPTY;
  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {

    let id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      id = parseInt(stringId, 10);
    }

    this.sub = this.timeslotService.getPastTimeslotsByPatient(id).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
