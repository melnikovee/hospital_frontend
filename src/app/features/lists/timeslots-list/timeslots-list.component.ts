import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.css']
})
export class TimeslotsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['date', 'time', 'specialty', 'doctor', 'cabinet', 'patient', 'action'];
  dataSource!: MatTableDataSource<Composite>;
  isTimeslotFree!: boolean;
  isPatientInTimeslot!: boolean;
  private timeslotSub = Subscription.EMPTY;
  private getTimeslotSub = Subscription.EMPTY;
  private deleteSub = Subscription.EMPTY;
  private cancelSub = Subscription.EMPTY;
  constructor(private compositeService: CompositeService, private timeSlotService: TimeslotService) {}

  ngOnInit() {
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.isPatientInTimeslot = false;
    this.timeslotSub = this.compositeService.getTimeslots().subscribe(data => {
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
      .sort((a, b) => a.doctor.localeCompare(b.doctor))
      .sort((a, b) => a.date.localeCompare(b.date));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  deleteTimeslot(id: number) {
    this.getTimeslotSub = this.timeslotSub = this.timeSlotService.getTimeslotById(id).subscribe(data => {
      this.isTimeslotFree = data.isFree;
    });
    if (this.isTimeslotFree) {
      if (confirm('Уверены что хотите удалить?')) {
        this.deleteSub = this.timeSlotService.deleteTimeslot(id)
        .subscribe(
          data => {
            this.reloadData();
          },
          error => console.log(error));
      }
    } else {
      this.isPatientInTimeslot = true;
    }
  }
  cancelRecord(id: number) {
    if (confirm('Уверены что хотите отменить запись?')) {
      this.cancelSub = this.timeSlotService.cancelRecord(id).subscribe(data => {
        this.reloadData();
      });
    }
  }

  ngOnDestroy(): void {
    this.timeslotSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.cancelSub.unsubscribe();
    this.getTimeslotSub.unsubscribe();
  }
}


