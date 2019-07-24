export class User {
  id!: number;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  role: string;
  constructor(login: string, password: string, firstName: string, lastName: string, email: string, role: string) {
    this.login = login;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}
