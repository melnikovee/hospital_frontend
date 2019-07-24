import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctorFullName} from '../_models/doctor-full-name';
import {PatientFullName} from '../_models/patient-full-name';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public getUserById(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  public getDoctorsByLastName(lastName: string): Observable<DoctorFullName[]> {
    return this.http.get<DoctorFullName[]>(`${this.usersUrl}/${'doctors'}/${lastName}`);
  }

  public getPatientsByLastName(lastName: string): Observable<PatientFullName[]> {
    return this.http.get<PatientFullName[]>(`${this.usersUrl}/${'patients'}/${lastName}`);
  }

  // tslint:disable-next-line:no-any
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.usersUrl}/${id}`, user);
  }
}

