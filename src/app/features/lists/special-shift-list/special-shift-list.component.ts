import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {SpecialShift} from '../../_models/special-shift';
import {PatientSpecialShift} from '../../_models/patient-special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';


@Component({
  selector: 'app-doctors-list',
  templateUrl: './special-shift-list.component.html',
  styleUrls: ['./special-shift-list.component.css']
})
export class SpecialShiftListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'cabinet', 'time', 'numberPatients', 'maxNumberPatients', 'action', 'actionTwo'];
  dataSource!: MatTableDataSource<SpecialShift>;

  constructor(private route: ActivatedRoute, private specialShiftService: SpecialShiftService,
              private patientSpecialShiftService: PatientSpecialShiftService) {
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
    console.log(id);
    this.specialShiftService.deleteSpecialShift(id).subscribe(data => {
      this.reloadData();
    });
  }
}
