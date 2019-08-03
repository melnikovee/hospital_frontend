import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctorFullName} from '../_models/doctor-full-name';
import {PatientFullName} from '../_models/patient-full-name';
import {User} from '../_models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public createPatient(user: User) {
    return this.http.post<User>('http://localhost:8080/users/patients/create', user);
  }

  public getUserById(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  public getDoctorsByLastName(lastName: string): Observable<DoctorFullName[]> {
    return this.http.get<DoctorFullName[]>(`${this.usersUrl}/${'doctors'}/${lastName}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.usersUrl}/${id}`, user);
  }

  changePassword(id: number, password: string) {
    return this.http.put('http://localhost:8080/users/password', {id, password});
  }
}

