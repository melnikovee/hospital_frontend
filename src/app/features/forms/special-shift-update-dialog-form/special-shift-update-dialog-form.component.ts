import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {PatientFullName} from '../../_models/patient-full-name';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';
import {SpecialShiftService} from '../../_services/special-shift-service.service';

@Component({
  selector: 'app-special-shift-update-dialog-form',
  templateUrl: './special-shift-update-dialog-form.component.html',
  styleUrls: ['./special-shift-update-dialog-form.component.css']
})
export class SpecialShiftUpdateDialogFormComponent implements OnInit {

  patients!: PatientFullName[];
  shiftId!: number;
  displayedColumns: string[] = ['name', 'birthday', 'action'];

  // tslint:disable-next-line:no-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private patientSpecialShiftService: PatientSpecialShiftService,
              private specialShiftService: SpecialShiftService) {
    this.shiftId = data.specialShiftId;
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.patientSpecialShiftService.getPatientsBySpecialShiftId(this.shiftId).subscribe(data => {
      this.patients = data;
    });
  }

  cancelRecord(patientId: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.patientSpecialShiftService.deleteOnePatientSpecialShift(patientId, this.shiftId).subscribe();
      this.specialShiftService.cancelRecord(this.shiftId).subscribe(data => {
        this.reloadData();
      });
    }
  }
}
