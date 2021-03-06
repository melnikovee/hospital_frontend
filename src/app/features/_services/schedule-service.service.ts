import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../_models/schedule';
import {Cabinet} from '../_models/cabinet';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private schedulsUrl: string;

  constructor(private http: HttpClient) {
    this.schedulsUrl = '/hospital/schedules';
  }

  public findFreeDays(doctorId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.schedulsUrl}/${'days'}/${doctorId}`);
  }

  public findFreeCabinets(date: string): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>(`${this.schedulsUrl}/${'cabinets'}/${date}`);
  }

  public getScheduleByDoctorAndCurrentDate(doctor: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.schedulsUrl}/${'get_spec'}/${doctor}`);
  }

  public save(schedule: Schedule) {
    return this.http.post<Schedule>(this.schedulsUrl, schedule);
  }
}

