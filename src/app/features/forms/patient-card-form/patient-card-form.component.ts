import {Component, ViewChild} from '@angular/core';
import {CardFormComponent} from '../card-form/card-form.component';

@Component({
  selector: 'app-patient-card-form',
  templateUrl: './patient-card-form.component.html',
  styleUrls: ['./patient-card-form.component.css']
})
export class PatientCardFormComponent {

  hardcodedPatient = 5;
  showTable!: boolean;

  @ViewChild(CardFormComponent, {static: false})
  private childComponent!: CardFormComponent;

  constructor() {
  }

  getCards() {
    this.showTable = true;
    this.childComponent.getCard(this.hardcodedPatient);
  }
}
