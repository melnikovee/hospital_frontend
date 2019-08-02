import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SpecialShift} from '../../_models/special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {PatientSpecialShift} from '../../_models/patient-special-shift';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';

@Component({
  selector: 'app-special-shift-for-patient-form',
  templateUrl: './special-shift-for-patient-form.component.html',
  styleUrls: ['./special-shift-for-patient-form.component.css']
})
export class SpecialShiftForPatientFormComponent implements OnInit {


  displayedColumns: string[] = ['name', 'date', 'cabinet', 'time', 'numberPatients', 'maxNumberPatients', 'action'];
  dataSource!: MatTableDataSource<SpecialShift>;
  patientSpecialShifts!: PatientSpecialShift[];
  patientId!: number;

  constructor(private specialShiftService: SpecialShiftService, private patientSpecialShiftService: PatientSpecialShiftService) {
  }

  ngOnInit() {
    this.reloadData();

    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.patientId = parseInt(stringId, 10);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.specialShiftService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.startTime.localeCompare(b.startTime))
      .sort((a, b) => a.endTime.localeCompare(b.endTime))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);

      this.getPatientSpecialShifts();
    });
  }

  getPatientSpecialShifts() {

    this.patientSpecialShiftService.findPatientSpecialShifts(this.patientId).subscribe(data => {
      this.patientSpecialShifts = data;
      console.log(this.patientSpecialShifts);
    });
  }

  checkSign(specShiftId: number): boolean {
    if (this.patientSpecialShifts !== undefined) {
      for (const patientSpecShift of this.patientSpecialShifts) {
        if (patientSpecShift.specialShift === specShiftId) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  signUp(id: number) {
    console.log(id);
    this.specialShiftService.signUp(id).subscribe();
    this.patientSpecialShiftService.save(new PatientSpecialShift(this.patientId, id)).subscribe(data => {
      this.reloadData();
    });
  }

  cancelRecord(id: number) {
    this.patientSpecialShiftService.deleteOnePatientSpecialShift(this.patientId, id).subscribe();
    this.specialShiftService.cancelRecord(id).subscribe(data => {
      this.reloadData();
    });
  }

  /*deleteTimeslot(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.timeSlotService.deleteTimeslot(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }
  }*/
  /*cancelRecord(id: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.timeSlotService.cancelRecord(id).subscribe(data => {
        this.reloadData();
      });
    }
  }*/

}
