export class Timeslot {

  id!: number;
  patient: number;
  specialty: number;
  doctor: number;
  cabinet: number;
  date: string;
  time: string;
  isFree: boolean;

  constructor(patient: number, specialty: number, doctor: number, cabinet: number, date: string, time: string, isFree: boolean) {
    this.patient = patient;
    this.specialty = specialty;
    this.doctor = doctor;
    this.cabinet = cabinet;
    this.date = date;
    this.time = time;
    this.isFree = isFree;
  }
}
