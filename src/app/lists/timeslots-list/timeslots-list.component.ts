import {Component, OnInit, ViewChild} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';


@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit {

  displayedColumns: string[] = ['Дата', 'Время', 'Специальность', 'Доктор', 'Кабинет', 'Пациент'];
  dataSource;

  constructor(private compositeService: CompositeService) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
                          .sort((a, b) => a.doctor.localeCompare(b.doctor))
                          .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }
}


