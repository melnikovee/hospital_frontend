import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompositeService} from '../../services/composite-service.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Пациент', 'Дата рождения', 'Телефон', 'Запись'];
  dataSource;

  constructor(private route: ActivatedRoute, private router: Router, private compositeService: CompositeService) {
  }

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
