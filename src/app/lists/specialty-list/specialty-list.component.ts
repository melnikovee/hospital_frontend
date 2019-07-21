import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SpecialtyService} from '../../services/specialty-service.service';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {

  displayedColumns: string[] = ['specialty', 'delete'];
  dataSource;

  constructor(private route: ActivatedRoute, private router: Router, private specialtyService: SpecialtyService) {}

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.specialtyService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.specialtyName.localeCompare(b.specialtyName));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  deleteSpecialty(id: number) {
    this.specialtyService.deleteSpecialty(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
