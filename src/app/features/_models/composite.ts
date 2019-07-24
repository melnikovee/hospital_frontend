export class Composite {

  id!: number;
  doctorId: number;
  patientId: number;
  doctorFirstName?: string;
  doctorLastName?: string;
  doctorMiddleName?: string;
  patientFirstName?: string;
  patientLastName?: string;
  patientMiddleName?: string;
  doctor: string;
  patient: string;
  specialty: string;
  cabinet: string;
  medicalOpinion: string;
  date: string;
  time: string;
  isFree: boolean;
  birthday: string;
  phone: string;
  email: string;
  maxNumberOfPatients?: number;
  numberOfPatients?: number;
  constructor(doctorId: number, patientId: number, doctor: string, patient: string,
              specialty: string, cabinet: string, medicalOpinion: string, date: string,
              time: string, isFree: boolean, birthday: string, phone: string, email: string) {
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.doctor = doctor;
    this.patient = patient;
    this.specialty = specialty;
    this.cabinet = cabinet;
    this.medicalOpinion = medicalOpinion;
    this.date = date;
    this.time = time;
    this.isFree = isFree;
    this.birthday = birthday;
    this.phone = phone;
    this.email = email;
  }
}
