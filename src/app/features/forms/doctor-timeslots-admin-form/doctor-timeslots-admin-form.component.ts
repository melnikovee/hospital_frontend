import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompositeService} from '../../_services/composite-service.service';

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
