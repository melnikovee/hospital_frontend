export class PatientFullName {

  id!: number;
  fullName: string;
  birthday: string;

  constructor(fullName: string, birthday: string) {
    this.fullName = fullName;
    this.birthday = birthday;
  }
}
