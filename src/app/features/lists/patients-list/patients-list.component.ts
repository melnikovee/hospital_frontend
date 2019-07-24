import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  displayedColumns: string[] = ['Пациент', 'Дата рождения', 'Телефон', 'Запись'];
  private dataSource!: MatTableDataSource<Composite>;

  constructor(private route: ActivatedRoute, private router: Router,
              private compositeService: CompositeService) {}

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.findPatients().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  makeAppointment(id: number) {
    this.router.navigate(['/makeAppointment', id]);
  }

}
