import {Component, OnInit, ViewChild} from '@angular/core';
import {CompositeService} from '../../services/composite-service.service';
import {Composite} from '../../models/composite';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {Diagnosis} from '../../models/diagnosis';
import {DiagnosisService} from '../../services/diagnosis-service.service';
import {CardFormComponent} from '../card-form/card-form.component';
import {Timeslot} from '../../models/timeslot';
import {TimeslotService} from '../../services/timeslot-service.service';

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
export class SearchPatientFormComponent implements OnInit {

  foundPatients!: Composite[];
  lastName!: string;
  displayedColumns: string[] = ['patient', 'birthday', 'card'];
  isGetPatients!: boolean;
  selectedPatient!: Composite;
  diagnosis!: Diagnosis | undefined;
  showAddForm!: boolean;
  opinion = new FormControl();
  showTables!: boolean;
  getCards!: boolean;
  timeSlotsForCheck!: Timeslot[];
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });
  matcher = new MyErrorStateMatcher();
  @ViewChild(CardFormComponent, {static: false})
  private childComponent!: CardFormComponent;

  constructor(private compositeService: CompositeService, public dialog: MatDialog,
              private diagnosisService: DiagnosisService, private timeslotService: TimeslotService) {
  }

  onSubmit() {
    this.lastName = this.spForm.get('lastName')!.value;

    this.compositeService.getUsersByName(this.lastName).subscribe(data => {
      this.foundPatients = data;
      this.isGetPatients = true;
    });
  }

  getCard(patient: Composite) {
    this.selectedPatient = patient;
    console.log(this.selectedPatient);
    this.getCards = true;
    this.childComponent.getCard(patient);
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

  ngOnInit(): void {
    this.timeslotService.getTimeslotsForDoctor(2).subscribe(data => {
      this.timeSlotsForCheck = data;
      console.log(this.timeSlotsForCheck);
    });
  }

  checkPatient(): boolean {

    if (this.selectedPatient !== undefined) {
      for (const timeslot of this.timeSlotsForCheck) {
        if (timeslot.patient === this.selectedPatient.id) {
          return true;
        }
      }
    }

    return false;
  }
}
