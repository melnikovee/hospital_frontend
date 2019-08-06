import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from '../searchpatient-form/searchpatient-form.component';
import {Router} from '@angular/router';
import {CompositeService} from '../../_services/composite-service.service';
import {Composite} from '../../_models/composite';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patient-record-by-doctor-form',
  templateUrl: './patient-record-by-doctor-form.component.html',
  styleUrls: ['./patient-record-by-doctor-form.component.css']
})
export class PatientRecordByDoctorFormComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['patient', 'birthday', 'record'];
  foundPatients!: Composite[];
  id!: number;
  private sub = Subscription.EMPTY;

  matcher = new MyErrorStateMatcher();

  constructor(private compositeService: CompositeService,
              private router: Router) {}

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
    this.sub = this.compositeService.recordByDoctor(this.id).subscribe(data => {
      this.foundPatients = data;
      }
    );
  }

  makeAppointment(id: number) {
    this.router.navigate(['/makeAppointment', id]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
