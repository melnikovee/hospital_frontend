import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doctor-timeslots-admin-form',
  templateUrl: './doctor-timeslots-admin-form.component.html',
  styleUrls: ['./doctor-timeslots-admin-form.component.css']
})
export class DoctorTimeslotsAdminFormComponent {

  doctorId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = 'id';
      this.doctorId = params[id];
    });
  }
}
