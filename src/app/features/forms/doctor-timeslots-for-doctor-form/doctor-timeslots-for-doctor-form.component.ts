import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-timeslots-for-doctor-form',
  templateUrl: './doctor-timeslots-for-doctor-form.component.html',
  styleUrls: ['./doctor-timeslots-for-doctor-form.component.css']
})
export class DoctorTimeslotsForDoctorFormComponent {

  doctorId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const stringId = localStorage.getItem('id');

      if (stringId) {
        this.doctorId = parseInt(stringId, 10);
      }
    });
  }
}
