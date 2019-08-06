import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-doctor-timeslots-for-doctor-form',
  templateUrl: './doctor-timeslots-for-doctor-form.component.html',
  styleUrls: ['./doctor-timeslots-for-doctor-form.component.css']
})
export class DoctorTimeslotsForDoctorFormComponent implements OnDestroy {

  doctorId!: number;
  private routeSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      const stringId = localStorage.getItem('id');

      if (stringId) {
        this.doctorId = parseInt(stringId, 10);
      }
    });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
