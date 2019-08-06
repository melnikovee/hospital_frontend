import {Component, Input, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-doctor-timeslots-list',
  templateUrl: './doctor-timeslots-list.component.html',
  styleUrls: ['./doctor-timeslots-list.component.css']
})
export class DoctorTimeslotsListComponent implements OnDestroy {
  displayedColumns: string[] = ['date', 'time', 'specialty', 'doctor', 'cabinet', 'patient'];
  id = 'id';
  dataSource!: MatTableDataSource<Composite>;
  private sub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService) {
  }

  @Input()
  set setDoctorId(doctorId: number) {
    this.reloadData(doctorId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData(doctorId: number) {
    this.sub = this.compositeService.getTimeslotsByDoctor(doctorId).subscribe(data => {
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


