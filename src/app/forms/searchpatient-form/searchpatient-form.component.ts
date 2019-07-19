import {Component, Input, Output, ViewChild} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {Composite} from '../../models/composite';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {DialogDiagnosisFormComponent} from '../dialog-diagnosis-form/dialog-diagnosis-form.component';
import {Diagnosis} from "../../models/diagnosis";
import {DiagnosisService} from "../../services/diagnosis-service.service";
import {CardFormComponent} from "../card-form/card-form.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-searchpatient-form',
  templateUrl: './searchpatient-form.component.html',
  styleUrls: ['./searchpatient-form.component.css'],
})
export class SearchPatientFormComponent {

  foundPatients: Composite[];
  lastName: string;
  displayedColumns: string[] = ['patient', 'birthday', 'card'];
  isGetPatients: boolean;
  isGetCards: boolean;
  selectedPatient: Composite;
  diagnosis: Diagnosis;
  showAddForm: boolean;
  opinion = new FormControl();
  showTables: boolean;

  lastNameFormControl = new FormControl('', [
    Validators.pattern('[A-Z][a-z]{1,31}'),
    Validators.required
  ]);

  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private compositeService: CompositeService, public dialog: MatDialog, private diagnosisService: DiagnosisService) {
  }

  onSubmit() {
    this.lastName = this.spForm.get('lastName').value;

    this.compositeService.getUsersByName(this.lastName).subscribe(data => {
      this.foundPatients = data;
      this.isGetPatients = true;
    });
  }

  getCard(patient: Composite) {
    this.selectedPatient = patient;
    this.isGetCards = true;
  }

  addDiagnosis() {
    this.showAddForm = !this.showAddForm;
    this.showTables = !this.showTables;

    if (this.diagnosis === undefined) {
      this.diagnosis = new Diagnosis();

      this.diagnosis.patient = this.selectedPatient.id;
      this.diagnosis.doctor = 1;
      this.diagnosis.date = new Date('2017-10-10');
      this.diagnosis.specialty = 3;
    } else {
      this.diagnosis.medicalOpinion = this.opinion.value;

      this.diagnosisService.save(this.diagnosis).subscribe(data => {
        this.diagnosis = undefined;
      });
    }
  }
}
