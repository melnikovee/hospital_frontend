import {Component, Input, OnInit} from '@angular/core';
import {CompositeService} from "../../services/composite-service.service";
import {MatDialog} from "@angular/material";
import {DiagnosisService} from "../../services/diagnosis-service.service";
import {Composite} from "../../models/composite";
import {DialogDiagnosisFormComponent} from "../dialog-diagnosis-form/dialog-diagnosis-form.component";

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {

  selectedOpinion: Composite;
  displayedColumns: string[] = ['doctor', 'date', 'specialty', 'medicalOpinion'];
  isGetCards: boolean;
  patientCard: Composite[];

  constructor(private compositeService: CompositeService, private dialog: MatDialog, private diagnosisService: DiagnosisService) {
  }

  getCard(patient: Composite) {
    this.compositeService.getDiagnosisByPatient(patient.id).subscribe(data => {
      this.patientCard = data;
      this.isGetCards = true;
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
