import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorsUrl: string;

  constructor(private http: HttpClient) {
    this.doctorsUrl = 'http://localhost:8080/doctors';
  }

  public findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorsUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(doctor: Doctor) {
    return this.http.post<Doctor>(this.doctorsUrl, doctor, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getDoctorById(id: number) {
    return this.http.get<Doctor>(`${this.doctorsUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteDoctor(id: number): Observable<Object> {
    return this.http.delete(`${this.doctorsUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  updateDoctor(id: number, doctor: Doctor) {
    return this.http.put(`${this.doctorsUrl}/${id}`, doctor, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
