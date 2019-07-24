import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';



@Component({
  selector: 'app-doctor-timeslots-list',
  templateUrl: './doctor-timeslots-list.component.html',
  styleUrls: ['./doctor-timeslots-list.component.css']
})
export class DoctorTimeslotsListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'specialty', 'doctor', 'cabinet', 'patient'];
  id = 'id';
  private dataSource!: MatTableDataSource<Composite>;
  private doctorId!: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService) {
    this.route.params.subscribe(params => this.doctorId = params[this.id]);
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


