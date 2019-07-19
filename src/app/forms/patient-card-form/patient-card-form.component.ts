import {Component, OnInit} from '@angular/core';
import {Composite} from '../../models/composite';
import {CompositeService} from '../../services/composite-service.service';

@Component({
  selector: 'app-patient-card-form',
  templateUrl: './patient-card-form.component.html',
  styleUrls: ['./patient-card-form.component.css']
})
export class PatientCardFormComponent {

  patientCard: Composite[];

  constructor(private compositeService: CompositeService) {
  }

  getPatientCard(patient: number) {
    this.compositeService.getDiagnosisByPatient(patient).subscribe(data => {
      this.patientCard = data;
      console.log(this.patientCard);
    });
  }
}
