import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-dialog-diagnosis-form',
  templateUrl: './dialog-diagnosis-form.component.html',
  styleUrls: ['./dialog-diagnosis-form.component.css']
})
export class DialogDiagnosisFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
