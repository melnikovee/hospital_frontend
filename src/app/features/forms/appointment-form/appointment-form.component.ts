import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Specialty} from '../../_models/specialty';
import {User} from '../../_models/user';
import {Timeslot} from '../../_models/timeslot';
import {TimeslotService} from '../../_services/timeslot-service.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
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
  idStr = 'id';
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
    this.route.params.subscribe(params => this.patientId = params[this.idStr]);
  }

  putData() {
    this.specialty = this.appointmentForm.controls.specialty.value.id;
    this.doctor = this.appointmentForm.controls.doctor.value.id;
    this.date = this.appointmentForm.controls.date.value;
    this.time = this.appointmentForm.controls.time.value;
  }

  getSpecialties() {
    this.timeslotService.findSpecialties().subscribe(
        (data: Specialty[]) => {
          this.specialties = data;
          this.specialties.sort();
        },
        error => console.log(error)
    );
  }

  getDoctors() {
    this.specialtyForDoctor = this.appointmentForm.controls.specialty.value.id;
    this.timeslotService.findDoctors(this.specialtyForDoctor).subscribe(
        (data: User[]) => {
          this.doctors = data;
          this.doctors.sort();
        },
        error => console.log(error)
    );
  }

  getDate() {
    this.doctorForDate = this.appointmentForm.controls.doctor.value.id;
    this.timeslotService.findDate(this.specialtyForDoctor, this.doctorForDate).subscribe(
        (data: string[]) => {
          this.freeDays = data;
          this.freeDays.sort();
        },
        error => console.log(error)
    );
  }

  getTime() {
    this.dateForTime = this.appointmentForm.controls.date.value;
    this.timeslotService.findTime(this.specialtyForDoctor, this.doctorForDate, this.dateForTime).subscribe(
        (data: string[]) => {
          this.freeTime = data;
          this.freeTime.sort();
        },
        error => console.log(error)
    );
  }

  onSubmit() {
    this.putData();
    this.timeslotService.findTimeslotForAppointment(this.specialty, this.doctor, this.date, this.time).subscribe(
        data => {
          this.timeslot.id = data.id;
          this.timeslot.specialty = data.specialty;
          this.timeslot.doctor = data.doctor;
          this.timeslot.cabinet = data.cabinet;
          this.timeslot.date = data.date;
          this.timeslot.time = data.time;
          this.timeslot.patient = this.patientId;
          this.timeslot.isFree = false;

          this.timeslotService.makeAppointment(this.timeslot.id, this.timeslot).subscribe(
              (ts: Timeslot) => {
                this.receivedTimeslot = ts;
                this.done = true;
                this.navigateToSchedule();
              });
        },
        error => console.log(error)
    );
  }
  navigateToSchedule() {
    // @ts-ignore
    if (localStorage.getItem('role').toString() === 'ADMINISTRATOR') {
      this.router.navigate(['/timeslots']);
    }
  }
}
