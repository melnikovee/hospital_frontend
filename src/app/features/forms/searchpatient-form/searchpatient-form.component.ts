import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatTableDataSource} from '@angular/material';
import {CardFormComponent} from '../card-form/card-form.component';
import {Composite} from '../../_models/composite';
import {CompositeService} from '../../_services/composite-service.service';
import {DiagnosisService} from '../../_services/diagnosis-service.service';
import {ScheduleService} from '../../_services/schedule-service.service';
import {AddDiagnosisDialogFormComponent} from '../add-diagnosis-dialog-form/add-diagnosis-dialog-form.component';
import {Subscription} from 'rxjs';

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
export class SearchPatientFormComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['patient', 'birthday', 'record'];
  dataSource!: MatTableDataSource<Composite>;
  // @ts-ignore
  selectedPatient: Composite = new Composite();
  currentDoctorSpecialty!: number;
  id!: number;
  isGetCards!: boolean;
  showAddButton!: boolean;
  @ViewChild(CardFormComponent, {static: false})
  private childComponent!: CardFormComponent;
  private patientSub = Subscription.EMPTY;
  private scheduleSub = Subscription.EMPTY;
  private dialogSub = Subscription.EMPTY;

  matcher = new MyErrorStateMatcher();

  constructor(private compositeService: CompositeService, private diagnosisService: DiagnosisService,
              private scheduleService: ScheduleService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = -1;
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
    this.patientSub = this.compositeService.patientsForDoctor(this.id).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      }
    );
    this.scheduleSub = this.scheduleService.getScheduleByDoctorAndCurrentDate(this.id).subscribe(data => {
      this.currentDoctorSpecialty = data.specialty;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPatient(patient: Composite) {
    this.selectedPatient = patient;
    this.getCard();
  }

  getCard() {
    this.isGetCards = true;
    this.showAddButton = true;
    this.childComponent.getCard(this.selectedPatient.patientId);
  }

  checkPatient() {
    return Date.parse(this.selectedPatient.time + ' ' + this.selectedPatient.date) <= Date.now();
  }

  openDialog() {
    this.dialogSub = this.dialog.open(AddDiagnosisDialogFormComponent, {
      data: {
        selectedPatientName: this.selectedPatient.patient,
        selectedPatientId: this.selectedPatient.patientId,
        doctorId: this.id,
        doctorSpecialty: this.currentDoctorSpecialty
      }, width: '70%'
    }).afterClosed().subscribe(
      data => {
        this.getCard();
      });
  }

  ngOnDestroy(): void {
    this.scheduleSub.unsubscribe();
    this.dialogSub.unsubscribe();
    this.patientSub.unsubscribe();
  }
}

