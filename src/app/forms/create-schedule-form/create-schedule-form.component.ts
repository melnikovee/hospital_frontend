import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Specialty} from '../../models/specialty';
import {DoctorSpecialtyService} from '../../services/doctorspecialty-service.service';
import {Schedule} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule-service.service';
import {SpecialtyService} from '../../services/specialty-service.service';
import {Cabinet} from '../../models/cabinet';

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
  doctorId: number;
  dateForCabinets: string;
  specialties: Specialty[];
  cabinets: Cabinet[];
  freeDays: string[];
  schedule: Schedule;
  receivedSchedule: Schedule;
  done: boolean;

  specialtyFormControl = new FormControl('', [
    Validators.required
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.required
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
              private specialtyService: SpecialtyService,
              private scheduleService: ScheduleService) {
    this.route.params.subscribe(params => this.doctorId = params['id']);
    this.schedule = new Schedule();
  }

  putData() {
    this.schedule.userId = this.doctorId;
    this.schedule.date = this.scheduleForm.get('date').value;
    this.schedule.startTime = this.scheduleForm.get('startTime').value.concat(':00');
    this.schedule.endTime = this.scheduleForm.get('endTime').value.concat(':00');
    this.schedule.cabinet = this.scheduleForm.get('cabinet').value.id;
    this.schedule.specialty = this.scheduleForm.get('specialty').value.id;
  }

  getSpecialties() {
    this.doctorSpecialtyService.findDoctorSpecialties(this.doctorId).subscribe(
        (data: Specialty[]) => {
          this.specialties = data;
        },
        error => console.log(error)
    );
  }

  getCabinets() {
    this.dateForCabinets = this.scheduleForm.get('date').value;
    this.scheduleService.findFreeCabinets(this.dateForCabinets).subscribe(
        (data: Cabinet[]) => {
          this.cabinets = data;
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

  cleanData() {
    this.dateForCabinets = undefined;
    this.cabinets = undefined;
    this.freeDays = undefined;
  }
}
