export class Specialty {
  id!: number;
  specialtyName: string;
  duration: number;


  constructor(specialtyName: string, duration: number) {
    this.specialtyName = specialtyName;
    this.duration = duration;
  }
}
