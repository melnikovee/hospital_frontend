import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timeslot} from '../models/timeslot';
import {Specialty} from '../models/specialty';
import {User} from '../models/user';
import {PatientTimeslot} from '../models/patient-timeslot';

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
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.timeslotsUrl}/${'specialties'}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findDoctors(specialtyId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.timeslotsUrl}/${'doctors'}/${specialtyId}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findDate(specialtyId: number, doctorId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.timeslotsUrl}/${'days'}/${specialtyId}/${doctorId}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findTime(specialtyId: number, doctorId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.timeslotsUrl}/${'time'}/${specialtyId}/${doctorId}/${date}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findTimeslotForAppointment(specialtyId: number, doctorId: number, date: string, time: string): Observable<Timeslot> {
    return this.http.get<Timeslot>(`${this.timeslotsUrl}/${specialtyId}/${doctorId}/${date}/${time}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public makeAppointment(id: number, timeslot: Timeslot): Observable<Timeslot> {
    return this.http.put<Timeslot>(`${this.timeslotsUrl}/${id}`, timeslot,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(timeslot: Timeslot) {
    return this.http.post<Timeslot>(this.timeslotsUrl, timeslot,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getTimeslotsForDoctor(id: number) {
    return this.http.get<Timeslot[]>(`${this.timeslotsUrl}/${'for_doctor'}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getTimeslotsForRecord(id: number) {
    return this.http.get<Timeslot[]>(`${this.timeslotsUrl}/${'for_record'}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getPastTimeslotsByPatient(id: number): Observable<PatientTimeslot[]> {
    return this.http.get<PatientTimeslot[]>(`${this.timeslotsUrl}/${'by_patient'}/${'past'}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getCurrentTimeslotsByPatient(id: number): Observable<PatientTimeslot[]> {
    return this.http.get<PatientTimeslot[]>(`${this.timeslotsUrl}/${'by_patient'}/${'current'}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public cancelRecord(id: number): Observable<Timeslot> {
    return this.http.put<Timeslot>(`${this.timeslotsUrl}/${'cancel'}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteTimeslot(id: number): Observable<Object> {
    return this.http.delete(`${this.timeslotsUrl}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
