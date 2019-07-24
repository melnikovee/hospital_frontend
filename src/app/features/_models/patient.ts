export class Patient {
  id!: number;
  birthday: string;
  phone: string;
  constructor(birthday: string, phone: string) {
    this.birthday = birthday;
    this.phone = phone;
  }
}
