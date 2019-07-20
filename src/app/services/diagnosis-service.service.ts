import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Diagnosis} from "../models/diagnosis";

@Injectable()
export class DiagnosisService {

  private diagnosisUrl: string;

  constructor(private http: HttpClient) {
    this.diagnosisUrl = 'http://localhost:8080/diagnoses';
  }

  public findAll(): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(this.diagnosisUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(diagnosis: Diagnosis) {
    return this.http.post<Diagnosis>(this.diagnosisUrl, diagnosis, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteDiagnosis(id: number): Observable<Object> {
    return this.http.delete(`${this.diagnosisUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}

