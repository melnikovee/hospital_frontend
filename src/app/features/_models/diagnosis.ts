export class Diagnosis {
  id!: number;
  patient: number;
  doctor: number;
  specialty: number;
  date?: string;
  medicalOpinion?: string;
  constructor(patient: number, doctor: number, specialty: number) {
    this.patient = patient;
    this.doctor = doctor;
    this.specialty = specialty;
  }
}
