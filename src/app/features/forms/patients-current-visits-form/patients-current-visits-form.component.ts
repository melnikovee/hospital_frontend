import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientTimeslot} from '../../_models/patient-timeslot';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patients-current-visits-form',
  templateUrl: './patients-current-visits-form.component.html',
  styleUrls: ['./patients-current-visits-form.component.css']
})
export class PatientsCurrentVisitsFormComponent implements OnInit, OnDestroy {

  foundPatientTimeslots!: PatientTimeslot[];
  displayedColumns: string[] = ['doctorName', 'specialtyName', 'cabinetName', 'date', 'time', 'record'];
  id!: number;
  private cancelRecordSub = Subscription.EMPTY;
  private timeslotSub = Subscription.EMPTY;

  constructor(private timeslotService: TimeslotService) {
  }

  ngOnInit(): void {

    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }

    this.reloadData();
  }
  reloadData() {
    this.timeslotSub = this.timeslotService.getCurrentTimeslotsByPatient(this.id).subscribe(data => {
      this.foundPatientTimeslots = data;
    });
  }
  cancelRecord(record: PatientTimeslot) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.cancelRecordSub = this.timeslotService.cancelRecord(record.id).subscribe(data => {
        this.reloadData();
      });
    }
  }

  ngOnDestroy(): void {
    this.timeslotSub.unsubscribe();
    this.cancelRecordSub.unsubscribe();
  }
}
