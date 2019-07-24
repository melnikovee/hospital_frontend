import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {CardFormComponent} from '../card-form/card-form.component';
import {Composite} from '../../_models/composite';
import {Diagnosis} from '../../_models/diagnosis';
import {Timeslot} from '../../_models/timeslot';
import {CompositeService} from '../../_services/composite-service.service';
import {DiagnosisService} from '../../_services/diagnosis-service.service';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {ScheduleService} from '../../services/schedule-service.service';
import {UserService} from '../../services/user-service.service';
import {PatientFullName} from '../../models/patient-full-name';

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
  private selectedPatient!: Composite;
  private diagnosis: Diagnosis | undefined;
  private foundPatients!: PatientFullName[];
  private lastName!: string;
  private isGetPatients!: boolean;
  private showAddForm!: boolean;
  private showTables!: boolean;
  private getCards!: boolean;
  private timeSlotsForCheck!: Timeslot[];
  displayedColumns: string[] = ['patient', 'birthday', 'card'];

  opinion = new FormControl();
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
              private diagnosisService: DiagnosisService, private timeslotService: TimeslotService) {}

  onSubmit() {
    this.lastName = this.spForm.controls.lastName.value;
    this.isGetPatients = false;
    this.showTables = true;
    this.getCards = false;

    this.userService.getPatientsByLastName(this.lastName).subscribe(data => {
      this.foundPatients = data;

      if (data.length !== 0) {
        this.isGetPatients = true;
        this.showTables = false;
      }
    });
  }

  getCard(patient: Composite) {
    this.checkPatient(patient);
    this.getCards = true;
    this.childComponent.getCard(patient);
  }

  addDiagnosis() {

    this.showAddForm = !this.showAddForm;
    this.showTables = !this.showTables;

    if (this.diagnosis === undefined) {
      this.diagnosis = new Diagnosis(this.selectedPatient.id, 1, 3, '2017-10-10');
    } else {
      this.diagnosis.medicalOpinion = this.opinion.value;

      this.diagnosisService.save(this.diagnosis).subscribe(data => {
        this.diagnosis = undefined;
      });
    }
  }

  ngOnInit(): void {

    this.timeslotService.getTimeslotsForDoctor(this.hardcodedDoctor).subscribe(data => {
      this.timeSlotsForCheck = data;
      console.log(this.timeSlotsForCheck);
    });
  }

  checkPatient(patient: Composite): boolean {

    for (const timeslot of this.timeSlotsForCheck) {
      if (timeslot.patient === patient.id) {
        this.isGetSelectedPatient = true;
        this.selectedPatient = patient;

        this.scheduleService.getScheduleByDoctorAndCurrentDate(this.hardcodedDoctor).subscribe(data => {
          this.currentDoctorSpecialty = data.specialty;
        });

        return true;
      }
    }

    return false;
  }
}
