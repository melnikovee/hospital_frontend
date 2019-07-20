import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timeslot} from '../models/timeslot';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  private timeslotsUrl: string;

  constructor(private http: HttpClient) {
    this.timeslotsUrl = 'http://localhost:8080/timeslots';
  }

  public findAll(): Observable<Timeslot[]> {
    return this.http.get<Timeslot[]>(this.timeslotsUrl, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public save(timeslot: Timeslot) {
    return this.http.post<Timeslot>(this.timeslotsUrl, timeslot, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public getTimeslotsForDoctor(id: number) {
    return this.http.get<Timeslot[]>(`${this.timeslotsUrl}/${'for_doctor'}/${id}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public getTimeslotsForRecord(id: number) {
    return this.http.get<Timeslot[]>(`${this.timeslotsUrl}/${'for_record'}/${id}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteTimeslot(id: number): Observable<Object> {
    return this.http.delete(`${this.timeslotsUrl}/${id}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
