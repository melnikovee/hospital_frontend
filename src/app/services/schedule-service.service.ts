import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../models/schedule';
import {Cabinet} from '../models/cabinet';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private schedulsUrl: string;

  constructor(private http: HttpClient) {
    this.schedulsUrl = 'http://localhost:8080/schedules';
  }

  public findAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.schedulsUrl,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findFreeDays(doctorId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.schedulsUrl}/${'days'}/${doctorId}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findFreeCabinets(date: string): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>(`${this.schedulsUrl}/${'cabinets'}/${date}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(schedule: Schedule) {
    return this.http.post<Schedule>(this.schedulsUrl, schedule,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteSchedule(id: number) {
    return this.http.delete(`${this.schedulsUrl}/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
