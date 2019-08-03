import {Component} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
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
  todaySpecialShifts: SpecialShift[] = [];
  startDate = Date.now();
  normalDate!: string;
  isDone!: boolean;
  isError!: boolean;

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  cabinetFormControl = new FormControl('', [
    Validators.required,
  ]);

  dateFormControl = new FormControl('', [
    Validators.required,
    this.dateValidator
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(([0,1][0-9о])|(2[0-3])):[0-5][0-9]')
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.pattern('(([0,1][0-9])|(2[0-3])):[0-5][0-9]')
  ]);

  maxPatientsFormControl = new FormControl('', [
    Validators.max(100),
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

  dateValidator(control: FormControl) {
    const date = control.value;

    if (date.toLocaleString() < (new Date()).toLocaleDateString()) {
      return {
        dateLate: {
          checkedDate: date
        }
      };
    }

    return null;
  }

  checkName() {
    if (this.nameFormControl.value !== undefined && this.todaySpecialShifts.length !== 0) {
      for (const specShift of this.todaySpecialShifts) {
        if (specShift.name.toLocaleLowerCase() === this.nameFormControl.value.toLocaleString().toLocaleLowerCase()) {
          return false;
        }
      }
    }
    return true;
  }

  checkTime() {
    return this.startTimeFormControl.value.toLocaleString() < this.endTimeFormControl.value.toLocaleString();
  }

  getInfo() {
    console.log('+++');

    console.log(this.specialShiftForm.controls.date.value);
    if (this.specialShiftForm.controls.date.value !== '') {
      this.normalDate = moment(this.specialShiftForm.controls.date.value).format('YYYY-MM-DD');
      this.getFreeCabinets();
      this.getSpecialShifts();

      this.isDone = false;
      this.isError = false;
    }
  }

  getFreeCabinets() {
    this.scheduleService.findFreeCabinets(this.normalDate).subscribe(data => {
      this.cabinets = data;
    });
  }

  getSpecialShifts() {
    this.specialShiftService.listSpecialShiftsByDate(this.normalDate).subscribe(data => {
      this.todaySpecialShifts = data;
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
    this.specialShiftService.save(this.specialShift).subscribe(result => {
      if (result) {
        this.getInfo();
        this.isDone = true;
      } else {
        this.isError = true;
      }
    });
  }
}
