import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';


@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  dataSource!: MatTableDataSource<Composite>;
  displayedColumns: string[] = ['doctor', 'specialty', 'phone', 'schedule', 'create', 'update'];

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService) {}

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.findDoctors().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  doctorSchedule(id: number) {
    this.router.navigate(['/doctorTimeslotsAdmin', id]);
  }

  createSchedule(id: number) {
    this.router.navigate(['/createSchedule', id]);
  }

  updateDoctor(id: number) {
    this.router.navigate(['/updateDoctor', id]);
  }
}
