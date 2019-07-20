import {Component, OnInit} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {MatTableDataSource, Sort} from '@angular/material';


@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit {

  displayedColumns: string[] = ['Дата', 'Время', 'Специальность', 'Доктор', 'Кабинет', 'Пациент', 'Запись'];
  dataSource;

  constructor(private compositeService: CompositeService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


}
