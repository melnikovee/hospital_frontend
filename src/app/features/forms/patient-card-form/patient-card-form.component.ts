import {Component, OnInit, ViewChild} from '@angular/core';
import {CardFormComponent} from '../card-form/card-form.component';

@Component({
  selector: 'app-patient-card-form',
  templateUrl: './patient-card-form.component.html',
  styleUrls: ['./patient-card-form.component.css']
})
export class PatientCardFormComponent implements OnInit {

  id!: number;

  constructor() {
  }

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
  }
}
