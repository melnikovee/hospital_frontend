export class CurrentUser {
  id: string | null;
  login!: string | null;
  role: string | null;

  constructor(id: string, login: string, role: string) {
    this.id = id;
    this.login = login;
    this.role = role;
  }
}
