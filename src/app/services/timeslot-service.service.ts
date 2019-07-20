import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timeslot} from '../models/timeslot';
import {Specialty} from '../models/specialty';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  private timeslotsUrl: string;

  constructor(private http: HttpClient) {
    this.timeslotsUrl = 'http://localhost:8080/timeslots';
  }

  public findAll(): Observable<Timeslot[]> {
    return this.http.get<Timeslot[]>(this.timeslotsUrl,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public findSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.timeslotsUrl}/${'specialties'}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public findDoctors(specialtyId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.timeslotsUrl}/${'doctors'}/${specialtyId}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public findDate(specialtyId: number, doctorId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.timeslotsUrl}/${'days'}/${specialtyId}/${doctorId}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public findTime(specialtyId: number, doctorId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.timeslotsUrl}/${'time'}/${specialtyId}/${doctorId}/${date}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public save(timeslot: Timeslot) {
    return this.http.post<Timeslot>(this.timeslotsUrl, timeslot,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteTimeslot(id: number): Observable<Object> {
    return this.http.delete(`${this.timeslotsUrl}/${id}`,
        { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
