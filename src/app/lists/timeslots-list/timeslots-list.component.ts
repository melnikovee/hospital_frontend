import {Component, OnInit, ViewChild} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {Time} from '@angular/common';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Time', 'Specialty', 'Doctor', 'Cabinet', 'Patient'];
  dataSource;

  constructor(private compositeService: CompositeService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.compositeService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

