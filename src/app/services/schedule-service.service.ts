import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private schedulsUrl: string;

  constructor(private http: HttpClient) {
    this.schedulsUrl = 'http://localhost:8080/schedules';
  }

  public findAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.schedulsUrl, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  public save(schedule: Schedule) {
    return this.http.post<Schedule>(this.schedulsUrl, schedule, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteSchedule(id: number): Observable<Object> {
    return this.http.delete(`${this.schedulsUrl}/${id}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
