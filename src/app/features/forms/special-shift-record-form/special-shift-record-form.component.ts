import {Component, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SpecialShift} from '../../_models/special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {PatientSpecialShift} from '../../_models/patient-special-shift';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-special-shift-for-patient-form',
  templateUrl: './special-shift-record-form.component.html',
  styleUrls: ['./special-shift-record-form.component.css']
})
export class SpecialShiftRecordFormComponent implements OnDestroy {

  displayedColumns: string[] = ['name', 'date', 'cabinet', 'time', 'numberPatients', 'maxNumberPatients', 'action'];
  dataSource!: MatTableDataSource<SpecialShift>;
  patientSpecialShifts: PatientSpecialShift[] = [];
  isRecordSuccess!: boolean;
  patientId!: number;
  private routeSub = Subscription.EMPTY;
  private listSub = Subscription.EMPTY;
  private forPatientSub = Subscription.EMPTY;
  private signUpSub = Subscription.EMPTY;
  private deleteSub = Subscription.EMPTY;
  private cancelSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private specialShiftService: SpecialShiftService,
              private patientSpecialShiftService: PatientSpecialShiftService) {

    const idString = 'id';
    this.routeSub = this.route.params.subscribe(params => this.patientId = params[idString]);
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.listSub = this.specialShiftService.listSpecialShiftsForPatient().subscribe(data => {
      const sorted = data.sort((a, b) => a.startTime.localeCompare(b.startTime))
      .sort((a, b) => a.endTime.localeCompare(b.endTime))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);

      this.getPatientSpecialShifts();
    });
  }

  hasPlace(specShift: SpecialShift): boolean {
    return specShift.numberOfPatients < specShift.maxNumberOfPatients;
  }

  getPatientSpecialShifts() {

    this.forPatientSub = this.patientSpecialShiftService.findPatientSpecialShifts(this.patientId).subscribe(data => {
      this.patientSpecialShifts = data;
    });
  }

  checkSign(specShiftId: number): boolean {
    for (const patientSpecShift of this.patientSpecialShifts) {
      if (patientSpecShift.specialShift === specShiftId) {
        return false;
      }
    }

    return true;
  }

  signUp(id: number) {
    if (confirm('Записаться на смену?')) {
      this.signUpSub = this.specialShiftService.signUp(this.patientId, id).subscribe(result => {
        this.isRecordSuccess = result;
        this.reloadData();
      });
    }
  }
  cancelRecord(id: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.deleteSub = this.patientSpecialShiftService.deleteOnePatientSpecialShift(this.patientId, id).subscribe();
      this.cancelSub = this.specialShiftService.cancelRecord(id).subscribe(data => {
        this.reloadData();
      });
    }
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.listSub.unsubscribe();
    this.forPatientSub.unsubscribe();
    this.signUpSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.cancelSub.unsubscribe();
  }
}
