import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Diagnosis} from '../../_models/diagnosis';
import {DiagnosisService} from '../../_services/diagnosis-service.service';

@Component({
  selector: 'app-add-diagnosis-dialog-form',
  templateUrl: './add-diagnosis-dialog-form.component.html',
  styleUrls: ['./add-diagnosis-dialog-form.component.css']
})
export class AddDiagnosisDialogFormComponent implements OnInit {

  patientId!: number;
  doctorId!: number;
  specialtyId!: number;
  patientName!: string;
  diagnosis!: Diagnosis;
  opinion = new FormControl('', [Validators.required, Validators.maxLength(10000)]);

  // tslint:disable-next-line:no-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private diagnosisService: DiagnosisService) {
    this.patientName = data.selectedPatientName;
    this.patientId = data.selectedPatientId;
    this.doctorId = data.doctorId;
    this.specialtyId = data.doctorSpecialty;
  }

  ngOnInit() {
  }

  addDiagnosis() {
    const medicalOpinion = this.opinion.value;
    this.diagnosis = new Diagnosis(this.patientId, this.doctorId, this.specialtyId);
    this.diagnosis.medicalOpinion = medicalOpinion;

    this.diagnosisService.save(this.diagnosis).subscribe(data => {
      this.opinion.reset();
    });
  }
}
