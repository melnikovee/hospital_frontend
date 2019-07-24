import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../_models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsUrl: string;

  constructor(private http: HttpClient) {
    this.patientsUrl = 'http://localhost:8080/patients';
  }

  public findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl);
  }

  public getPatientById(id: number) {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`);
  }

  public save(patient: Patient) {
    console.log(patient);
    return this.http.post<Patient>(this.patientsUrl, patient);
  }

  updatePatient(id: number, patient: Patient) {
    return this.http.put(`${this.patientsUrl}/${id}`, patient);
  }
}
