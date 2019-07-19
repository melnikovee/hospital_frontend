import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Specialty} from '../../models/specialty';
import {DoctorSpecialtyService} from '../../services/doctorspecialty-service.service';
import {Schedule} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule-service.service';
import {SpecialtyService} from '../../services/specialty-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-schedule-form.component.html',
  styleUrls: ['./doctor-schedule-form.component.css']
})
export class DoctorScheduleFormComponent {
  doctorId: number;
  specialties: Specialty[];
  schedule: Schedule;
  receivedSchedule: Schedule;
  done: boolean;
  //selectedSpecialtyFormControl = new FormControl();

  specialtyFormControl = new FormControl();

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
    this.route.params.subscribe( params => this.doctorId = params['id']);
    this.schedule = new Schedule();
  }

  putData() {
    this.schedule.userId = this.doctorId;
    this.schedule.date = this.scheduleForm.get('date').value;
    this.schedule.startTime = this.scheduleForm.get('startTime').value;
    this.schedule.endTime = this.scheduleForm.get('endTime').value;
    this.schedule.cabinet = this.scheduleForm.get('cabinet').value;
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

  onSubmit() {
    this.putData();
    console.log(this.schedule);
    this.scheduleService.save(this.schedule).subscribe(
        (data: Schedule) => {
          this.receivedSchedule = data;
          this.done = true;
        },
        error => console.log(error)
    );
  }
}
