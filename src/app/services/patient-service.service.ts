import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsUrl: string;

  constructor(private http: HttpClient) {
    this.patientsUrl = 'http://localhost:8080/patients';
  }

  public findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getPatientById(id: number) {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(patient: Patient) {
    console.log(patient);
    return this.http.post<Patient>(this.patientsUrl, patient, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  updatePatient(id: number, patient: Patient) {
    return this.http.put(`${this.patientsUrl}/${id}`, patient, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.patientsUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
