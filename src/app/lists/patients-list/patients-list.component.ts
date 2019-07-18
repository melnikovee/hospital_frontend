import { Component, OnInit } from '@angular/core';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient-service.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.patientService.findAll().subscribe(data => {
      this.patients = data;
    });
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
