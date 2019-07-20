import {Component, OnInit} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {MatTableDataSource, Sort} from '@angular/material';
import {Composite} from "../../models/composite";


@Component({
  selector: 'app-user-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit {

  displayedColumns: string[] = ['Дата', 'Время', 'Специальность', 'Доктор', 'Кабинет', 'Пациент', 'Запись'];
  dataSource;
  composites: Composite[];
  sortedData: Composite[];

  constructor(private compositeService: CompositeService) {
  }

  // sortData(sort: Sort) {
  //   const data = this.composites.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }
  //
  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'date':
  //         return compare(a.date, b.date, isAsc);
  //       case 'specialty':
  //         return compare(a.specialty, b.specialty, isAsc);
  //       case 'doctor':
  //         return compare(a.doctor, b.doctor, isAsc);
  //       case 'cabinet':
  //         return compare(a.cabinet, b.cabinet, isAsc);
  //       case 'patient':
  //         return compare(a.patient, b.patient, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


}

// function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
