import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-doctor-timeslots-admin-form',
  templateUrl: './doctor-timeslots-admin-form.component.html',
  styleUrls: ['./doctor-timeslots-admin-form.component.css']
})
export class DoctorTimeslotsAdminFormComponent implements OnDestroy {

  doctorId!: number;
  private routeSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      const id = 'id';
      this.doctorId = params[id];
    });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
