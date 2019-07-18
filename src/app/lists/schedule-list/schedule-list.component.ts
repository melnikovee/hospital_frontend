import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule-service.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[];

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.scheduleService.findAll().subscribe(data => {
      this.schedules = data;
    });
  }

  deleteSchedule(id: number) {
    this.scheduleService.deleteSchedule(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
