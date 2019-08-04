import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {SpecialShift} from '../../_models/special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
// tslint:disable-next-line:max-line-length
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
    this.specialShiftService.listSpecialShiftsForPatient().subscribe(data => {
      const sorted = data.sort((a, b) => a.startTime.localeCompare(b.startTime))
      .sort((a, b) => a.endTime.localeCompare(b.endTime))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  delete(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.specialShiftService.deleteSpecialShift(id).subscribe(data => {
        this.reloadData();
      });
    }
  }

  checkDate(specialShift: SpecialShift) {
    return Date.parse(specialShift.date + ' ' + specialShift.endTime) > Date.now();
  }

  openDialog(id: number) {
    this.dialog.open(SpecialShiftUpdateDialogFormComponent, {
      data: {
        specialShiftId: id
      }, width: '70%'

    }).afterClosed().subscribe(data => {
      this.reloadData();
    });
  }
}
