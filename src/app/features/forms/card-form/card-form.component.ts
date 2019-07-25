import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogDiagnosisFormComponent} from '../dialog-diagnosis-form/dialog-diagnosis-form.component';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  selectedOpinion = new Composite(0, 0, '', '', '',
    '', '', '', '', false, '', '', '');
  patientCard!: Composite[];
  displayedColumns: string[] = ['doctor', 'date', 'specialty', 'medicalOpinion'];
  constructor(private compositeService: CompositeService, private dialog: MatDialog) {}

  getCard(patient: number) {

    this.compositeService.getDiagnosisByPatient(patient).subscribe(data => {
      this.patientCard = data;
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
