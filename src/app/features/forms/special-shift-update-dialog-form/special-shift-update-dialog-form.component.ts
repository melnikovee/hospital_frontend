import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {PatientFullName} from '../../_models/patient-full-name';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-special-shift-update-dialog-form',
  templateUrl: './special-shift-update-dialog-form.component.html',
  styleUrls: ['./special-shift-update-dialog-form.component.css']
})
export class SpecialShiftUpdateDialogFormComponent implements OnInit, OnDestroy {

  patients!: PatientFullName[];
  shiftId!: number;
  displayedColumns: string[] = ['name', 'birthday', 'action'];
  private patientSub = Subscription.EMPTY;
  private deleteSub = Subscription.EMPTY;
  private cancelSub = Subscription.EMPTY;

  // tslint:disable-next-line:no-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private patientSpecialShiftService: PatientSpecialShiftService,
              private specialShiftService: SpecialShiftService) {
    this.shiftId = data.specialShiftId;
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.patientSub = this.patientSpecialShiftService.getPatientsBySpecialShiftId(this.shiftId).subscribe(data => {
      this.patients = data;
    });
  }

  cancelRecord(patientId: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.deleteSub = this.patientSpecialShiftService.deleteOnePatientSpecialShift(patientId, this.shiftId).subscribe();
      this.cancelSub = this.specialShiftService.cancelRecord(this.shiftId).subscribe(data => {
        this.reloadData();
      });
    }
  }

  ngOnDestroy(): void {
    this.patientSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.cancelSub.unsubscribe();
  }
}
