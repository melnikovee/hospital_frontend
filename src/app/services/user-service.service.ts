import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {DoctorFullName} from '../models/doctor-full-name';
import {PatientFullName} from '../models/patient-full-name';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getUserById(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getDoctorsByLastName(lastName: string): Observable<DoctorFullName[]> {
    return this.http.get<DoctorFullName[]>(`${this.usersUrl}/${'doctors'}/${lastName}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public getPatientsByLastName(lastName: string): Observable<PatientFullName[]> {
    return this.http.get<PatientFullName[]>(`${this.usersUrl}/${'patients'}/${lastName}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.usersUrl}/${id}`, user,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
