import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogDiagnosisFormComponent} from '../dialog-diagnosis-form/dialog-diagnosis-form.component';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {PatientSpecialShiftService} from '../../_services/patient-special-shift-service.service';
import {SpecialShift} from '../../_models/special-shift';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  selectedOpinion = new Composite(0, 0, '', '', '',
    '', '', '', '', false, '', '', '');
  patientCard!: Composite[];
  specialShifts!: SpecialShift[];
  displayedColumns: string[] = ['doctor', 'date', 'specialty', 'medicalOpinion'];
  displayedColumnsSpecShifts: string[] = ['name', 'date', 'time'];

  constructor(private compositeService: CompositeService,
              private patientSpecialShiftService: PatientSpecialShiftService, private dialog: MatDialog) {
  }

  @Input()
  set card(patient: number) {
    this.getCard(patient);
  }

  getCard(patient: number) {

    this.compositeService.getDiagnosisByPatient(patient).subscribe(data => {
      this.patientCard = data;
    });

    this.patientSpecialShiftService.getPatientSpecialShiftCard(patient).subscribe(data => {
      this.specialShifts = data;
    });
  }

  getOpinion(opinion: Composite) {
    this.selectedOpinion = opinion;
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(DialogDiagnosisFormComponent, {
      data: {
        selectedOpinion: this.selectedOpinion
      }
    });
  }
}
