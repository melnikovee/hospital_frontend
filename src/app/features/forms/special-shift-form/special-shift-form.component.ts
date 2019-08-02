import {Component, OnInit} from '@angular/core';
import {DateAdapter, ErrorStateMatcher, NativeDateAdapter} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SpecialShift} from '../../_models/special-shift';
import {SpecialShiftService} from '../../_services/special-shift-service.service';
import {Cabinet} from '../../_models/cabinet';
import {ScheduleService} from '../../_services/schedule-service.service';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-special-shift-form',
  templateUrl: './special-shift-form.component.html',
  styleUrls: ['./special-shift-form.component.css']
})
export class SpecialShiftFormComponent {

  specialShift = new SpecialShift('', '', '', '', '', 0);
  cabinets!: Cabinet[];
  startDate = Date.now();
  selectedCabinetFormControl = new FormControl();
  normalDate!: string;

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  cabinetFormControl = new FormControl('', [
    Validators.required,
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-1][0-9]|[2][0-3]:[0-5][0-9]')
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.pattern('[0-1][0-9]|[2][0-3]:[0-5][0-9]')
  ]);

  maxPatientsFormControl = new FormControl('', [
    Validators.max(30),
    Validators.required
  ]);

  specialShiftForm = new FormGroup({
    name: this.nameFormControl,
    cabinet: this.cabinetFormControl,
    date: this.dateFormControl,
    startTime: this.startTimeFormControl,
    endTime: this.endTimeFormControl,
    maxPatients: this.maxPatientsFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private specialShiftService: SpecialShiftService, private scheduleService: ScheduleService) {
  }

  getFreeCabinets() {
    this.normalDate = moment(this.specialShiftForm.controls.date.value).format('YYYY-MM-DD');

    this.scheduleService.findFreeCabinets(this.normalDate).subscribe(data => {
      this.cabinets = data;
    });
  }

  putData() {
    this.specialShift.name = this.specialShiftForm.controls.name.value;
    this.specialShift.cabinet = this.specialShiftForm.controls.cabinet.value.id;
    this.specialShift.date = this.normalDate;
    this.specialShift.startTime = this.specialShiftForm.controls.startTime.value;
    this.specialShift.endTime = this.specialShiftForm.controls.endTime.value;
    this.specialShift.maxNumberOfPatients = this.specialShiftForm.controls.maxPatients.value;
  }

  onSubmit() {
    this.putData();
    console.log(this.specialShift);
    this.specialShiftService.save(this.specialShift).subscribe();
  }
}
