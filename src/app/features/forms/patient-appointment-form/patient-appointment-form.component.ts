import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Specialty} from '../../_models/specialty';
import {User} from '../../_models/user';
import {Timeslot} from '../../_models/timeslot';
import {TimeslotService} from '../../_services/timeslot-service.service';
import {Subscription} from 'rxjs';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-patient-appointment-form',
  templateUrl: './patient-appointment-form.component.html',
  styleUrls: ['./patient-appointment-form.component.css']
})
export class PatientAppointmentFormComponent implements OnDestroy{
  patientId!: number;
  specialtyForDoctor!: number;
  doctorForDate!: number;
  dateForTime!: string;
  specialties!: Specialty[];
  doctors!: User[];
  freeDays!: string[];
  freeTime!: string[];
  specialty!: number;
  doctor!: number;
  date!: string;
  time!: string;
  id!: number;
  done!: boolean;
  timeslot = new Timeslot(0, 0, 0, 0, '', '', false);
  receivedTimeslot!: Timeslot;
  private routeSub = Subscription.EMPTY;
  private specialtiesSub = Subscription.EMPTY;
  private doctorSub = Subscription.EMPTY;
  private dateSub = Subscription.EMPTY;
  private timeSub = Subscription.EMPTY;
  private timeslotSub = Subscription.EMPTY;
  private appointmentSub = Subscription.EMPTY;
  specialtyFormControl = new FormControl('', [
    Validators.required
  ]);

  doctorFormControl = new FormControl('', [
    Validators.required
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  timeFormControl = new FormControl('', [
    Validators.required
  ]);

  appointmentForm = new FormGroup({
    specialty: this.specialtyFormControl,
    doctor: this.doctorFormControl,
    date: this.dateFormControl,
    time: this.timeFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private timeslotService: TimeslotService) {
    this.routeSub = this.route.params.subscribe(params => {
      const stringId = localStorage.getItem('id');

      if (stringId) {
        this.patientId = parseInt(stringId, 10);
      }
    });
  }

  putData() {
    this.specialty = this.appointmentForm.controls.specialty.value.id;
    this.doctor = this.appointmentForm.controls.doctor.value.id;
    this.date = this.appointmentForm.controls.date.value;
    this.time = this.appointmentForm.controls.time.value;
  }

  getSpecialties() {
    this.specialtiesSub = this.timeslotService.findSpecialties().subscribe(
        (data: Specialty[]) => {
          this.specialties = data;
          this.specialties.sort();
        },
        error => console.log(error)
    );
  }

  getDoctors() {
    this.specialtyForDoctor = this.appointmentForm.controls.specialty.value.id;
    this.doctorSub = this.timeslotService.findDoctors(this.specialtyForDoctor).subscribe(
        (data: User[]) => {
          this.doctors = data;
          this.doctors.sort();
        },
        error => console.log(error)
    );
  }

  getDate() {
    this.doctorForDate = this.appointmentForm.controls.doctor.value.id;
    this.dateSub = this.timeslotService.findDate(this.specialtyForDoctor, this.doctorForDate).subscribe(
        (data: string[]) => {
          this.freeDays = data;
          this.freeDays.sort();
        },
        error => console.log(error)
    );
  }

  getTime() {
    this.dateForTime = this.appointmentForm.controls.date.value;
    this.timeslotSub = this.timeslotService.findTime(this.specialtyForDoctor, this.doctorForDate, this.dateForTime).subscribe(
        (data: string[]) => {
          this.freeTime = data;
          this.freeTime.sort();
        },
        error => console.log(error)
    );
  }

  onSubmit() {
    this.putData();
    this.timeslotSub = this.timeslotService.findTimeslotForAppointment(this.specialty, this.doctor, this.date, this.time).subscribe(
        data => {
          this.timeslot.id = data.id;
          this.timeslot.specialty = data.specialty;
          this.timeslot.doctor = data.doctor;
          this.timeslot.cabinet = data.cabinet;
          this.timeslot.date = data.date;
          this.timeslot.time = data.time;
          this.timeslot.patient = this.patientId;
          this.timeslot.isFree = false;

          this.appointmentSub = this.timeslotService.makeAppointment(this.timeslot.id, this.timeslot).subscribe(
              (ts: Timeslot) => {
                this.receivedTimeslot = ts;
                this.done = true;
              });
        },
        error => console.log(error)
    );
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.specialtiesSub.unsubscribe();
    this.doctorSub.unsubscribe();
    this.dateSub.unsubscribe();
    this.timeSub.unsubscribe();
    this.timeslotSub.unsubscribe();
    this.appointmentSub.unsubscribe();
  }
}
