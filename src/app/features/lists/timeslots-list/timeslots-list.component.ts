import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {TimeslotService} from '../../_services/timeslot-service.service';

@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit {

  displayedColumns: string[] = ['date', 'time', 'specialty', 'doctor', 'cabinet', 'patient', 'action'];
  dataSource!: MatTableDataSource<Composite>;
  constructor(private compositeService: CompositeService, private timeSlotService: TimeslotService) {}

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.compositeService.getTimeslots().subscribe(data => {
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
      .sort((a, b) => a.doctor.localeCompare(b.doctor))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  deleteTimeslot(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.timeSlotService.deleteTimeslot(id)
      .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }
  cancelRecord(id: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.timeSlotService.cancelRecord(id).subscribe(data => {
        this.reloadData();
      });
    }
  }
}


