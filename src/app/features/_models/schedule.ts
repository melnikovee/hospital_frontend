export class Schedule {
  id!: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  specialty: number;
  cabinet: number;


  constructor(userId: number, date: string, startTime: string, endTime: string, specialty: number, cabinet: number) {
    this.userId = userId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.specialty = specialty;
    this.cabinet = cabinet;
  }
}
