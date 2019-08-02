export class SpecialShift {
  id!: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  cabinet: string;
  maxNumberOfPatients: number;
  numberOfPatients!: number;


  constructor(name: string, date: string, startTime: string, endTime: string, cabinet: string, maxNumberOfPatients: number) {
    this.name = name;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.cabinet = cabinet;
    this.maxNumberOfPatients = maxNumberOfPatients;
  }
}
