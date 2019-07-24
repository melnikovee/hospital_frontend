import {Component, OnInit} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Composite} from '../../models/composite';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  private dataSource!: MatTableDataSource<Composite>;
  displayedColumns: string[] = ['Doctor', 'Specialty', 'Phone', 'Schedule', 'createSchedule'];

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
    this.router.navigate(['/doctorTimeslots', id]);
  }

  createSchedule(id: number) {
    this.router.navigate(['/createSchedule', id]);
  }
}
