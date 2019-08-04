import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Cabinet} from '../../_models/cabinet';
import {Schedule} from '../../_models/schedule';
import {Specialty} from '../../_models/specialty';
import {DoctorSpecialtyService} from '../../_services/doctorspecialty-service.service';
import {SpecialtyService} from '../../_services/specialty-service.service';
import {ScheduleService} from '../../_services/schedule-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-schedule-form',
  templateUrl: './create-schedule-form.component.html',
  styleUrls: ['./create-schedule-form.component.css']
})
export class CreateScheduleFormComponent {
  id = 'id';
  doctorId = 0;
  cabinets: Cabinet[] | undefined;
  freeDays: string[] | undefined;
  schedule = new Schedule(0, '', '', '', 0, 0);
  receivedSchedule!: Schedule;
  dateForCabinets!: string;
  specialties!: Specialty[];
  done!: boolean;
  specialtyFormControl = new FormControl('', [
    Validators.required
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(([0,1][0-9о])|(2[0-3])):[0-5][0-9]')
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(([0,1][0-9о])|(2[0-3])):[0-5][0-9]')
  ]);

  cabinetFormControl = new FormControl('', [
    Validators.required
  ]);

  scheduleForm = new FormGroup({
    date: this.dateFormControl,
    startTime: this.startTimeFormControl,
    endTime: this.endTimeFormControl,
    cabinet: this.cabinetFormControl,
    specialty: this.specialtyFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorSpecialtyService: DoctorSpecialtyService,
              private specialtyService: SpecialtyService, private scheduleService: ScheduleService) {
    this.route.params.subscribe(params => this.doctorId = params[this.id]);
  }

  putData() {
    this.schedule.userId = this.doctorId;
    this.schedule.date = this.scheduleForm.controls.date.value;
    this.schedule.startTime = this.scheduleForm.controls.startTime.value.concat(':00');
    this.schedule.endTime = this.scheduleForm.controls.endTime.value.concat(':00');
    this.schedule.cabinet = this.scheduleForm.controls.cabinet.value.id;
    this.schedule.specialty = this.scheduleForm.controls.specialty.value.id;
  }

  getSpecialties() {
    this.doctorSpecialtyService.findDoctorSpecialties(this.doctorId).subscribe(
        (data: Specialty[]) => {
          const sorted = data.sort((a, b) => a.specialtyName.localeCompare(b.specialtyName));
          this.specialties = sorted;
        },
        error => console.log(error)
    );
  }

  getCabinets() {
    this.dateForCabinets = this.scheduleForm.controls.date.value;
    this.scheduleService.findFreeCabinets(this.dateForCabinets).subscribe(
        (data: Cabinet[]) => {
          const sorted = data.sort((a, b) => a.cabinetName.localeCompare(b.cabinetName));
          this.cabinets = sorted;
        },
        error => console.log(error)
    );
  }

  getFreeDays() {
    this.scheduleService.findFreeDays(this.doctorId).subscribe(
        (data: string[]) => {
          this.freeDays = data;
        },
        error => console.log(error)
    );
  }

  onSubmit() {
    this.putData();
    this.scheduleService.save(this.schedule).subscribe(
        (data: Schedule) => {
          this.receivedSchedule = data;
          this.done = true;
          this.cleanData();
        },
        error => console.log(error)
    );
  }

  checkTime() {
    return this.startTimeFormControl.value.toLocaleString() < this.endTimeFormControl.value.toLocaleString();
  }

  cleanData() {
    this.dateForCabinets = '';
    this.cabinets = undefined;
    this.freeDays = undefined;
  }
}
