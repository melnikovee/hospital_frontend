export class PatientTimeslot {

  id!: number;
  doctorName: string;
  specialtyName: string;
  cabinetName: string;
  time: string;
  date: string;

  constructor(doctorName: string, specialtyName: string, cabinetName: string, time: string, date: string) {
    this.doctorName = doctorName;
    this.specialtyName = specialtyName;
    this.cabinetName = cabinetName;
    this.time = time;
    this.date = date;
  }
}
