import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Composite} from '../_models/composite';


@Injectable({
  providedIn: 'root'
})
export class CompositeService {

  private compositeUrl: string;

  constructor(private http: HttpClient) {
    this.compositeUrl = 'http://localhost:8080/composite';
  }

  public getTimeslots(): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'schedule'}`);
  }

  public getTimeslotsByDoctor(doctor: number): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'schedule'}/${doctor}`);
  }

  public getUsersByName(lastName: string): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'users'}/${lastName}`);
  }

  public getDoctorsByName(lastName: string): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'doctors'}/${lastName}`);
  }

  public getDiagnosisByPatient(patient: number): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'patient_diagnoses'}/${patient}`);
  }

  public findDoctors(): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'doctors'}`);
  }

  public findPatients(): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'patients'}`);
  }

  public recordByDoctor(id: number) {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'for_record'}/${id}`);
  }
}
