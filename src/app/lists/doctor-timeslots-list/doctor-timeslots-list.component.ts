import {Component, OnInit, ViewChild} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TimeslotService} from '../../services/timeslot-service.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-doctor-timeslots-list',
  templateUrl: './doctor-timeslots-list.component.html',
  styleUrls: ['./doctor-timeslots-list.component.css']
})
export class DoctorTimeslotsListComponent implements OnInit {

  doctorId: number;
  displayedColumns: string[] = ['date', 'time', 'specialty', 'doctor', 'cabinet', 'patient'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService, private timeSlotService: TimeslotService) {
    this.route.params.subscribe(params => this.doctorId = params['id']);
  }

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.getTimeslotsByDoctor(this.doctorId).subscribe(data => {
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }
}


