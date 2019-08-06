import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['patient', 'birthday', 'phone', 'action', 'actionTwo'];
  dataSource!: MatTableDataSource<Composite>;
  private sub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService) {}

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.sub = this.compositeService.findPatients().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  makeAppointment(id: number) {
    this.router.navigate(['/makeAppointment', id]);
  }

  makeSpecialShiftRecord(id: number) {
    this.router.navigate(['/patientspecialshiftrecord', id]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
