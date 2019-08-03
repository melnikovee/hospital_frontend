import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {SpecialShift} from '../../_models/special-shift';
import {PatientSpecialShift} from '../../_models/patient-special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';
import {DialogDiagnosisFormComponent} from '../../forms/dialog-diagnosis-form/dialog-diagnosis-form.component';
import {SpecialShiftUpdateDialogFormComponent} from '../../forms/special-shift-update-dialog-form/special-shift-update-dialog-form.component';


@Component({
  selector: 'app-doctors-list',
  templateUrl: './special-shift-list.component.html',
  styleUrls: ['./special-shift-list.component.css']
})
export class SpecialShiftListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'cabinet', 'time', 'numberPatients', 'maxNumberPatients', 'action', 'actionTwo'];
  dataSource!: MatTableDataSource<SpecialShift>;

  constructor(private route: ActivatedRoute, private specialShiftService: SpecialShiftService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reloadData();
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
    });
  }

  delete(id: number) {
    this.specialShiftService.deleteSpecialShift(id).subscribe(data => {
      this.reloadData();
    });
  }

  checkDate(specialShift: SpecialShift) {
    //console.log(Date.parse(specialShift.date + ' ' + specialShift.endTime));
    return Date.parse(specialShift.date + ' ' + specialShift.endTime) > Date.now();
  }

  openDialog(id: number) {
    this.dialog.open(SpecialShiftUpdateDialogFormComponent, {
      data: {
        specialShiftId: id
      }, width: '70%'
    });
  }
}
