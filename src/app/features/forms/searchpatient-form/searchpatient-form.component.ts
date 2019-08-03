import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher, MatTableDataSource} from '@angular/material';
import {CardFormComponent} from '../card-form/card-form.component';
import {Composite} from '../../_models/composite';
import {Diagnosis} from '../../_models/diagnosis';
import {CompositeService} from '../../_services/composite-service.service';
import {DiagnosisService} from '../../_services/diagnosis-service.service';
import {ScheduleService} from '../../_services/schedule-service.service';

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

  displayedColumns: string[] = ['patient', 'birthday', 'record'];
  dataSource!: MatTableDataSource<Composite>;
  // foundPatients!: Composite[];
  selectedPatientId!: number;
  currentDoctorSpecialty!: number;
  diagnosis: Diagnosis | undefined;
  id!: number;
  showAddForm!: boolean;
  isGetCards!: boolean;
  opinion = new FormControl();
  @ViewChild(CardFormComponent, {static: false})
  private childComponent!: CardFormComponent;

  matcher = new MyErrorStateMatcher();

  constructor(private compositeService: CompositeService, private diagnosisService: DiagnosisService,
              private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
    this.compositeService.patientsForDoctor(this.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      }
    );
    this.scheduleService.getScheduleByDoctorAndCurrentDate(this.id).subscribe(data => {
      this.currentDoctorSpecialty = data.specialty;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCard(patient: Composite) {
    this.isGetCards = true;
    this.selectedPatientId = patient.patientId;
    this.childComponent.getCard(patient.patientId);
  }

  addDiagnosis() {
    this.showAddForm = !this.showAddForm;
    if (this.diagnosis === undefined) {
      this.diagnosis = new Diagnosis(this.selectedPatientId, this.id, this.currentDoctorSpecialty);
    } else {
      this.diagnosis.medicalOpinion = this.opinion.value;

      this.diagnosisService.save(this.diagnosis).subscribe(data => {
        this.diagnosis = undefined;
      });
    }
  }
}

