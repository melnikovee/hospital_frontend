import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Diagnosis} from '../_models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private diagnosisUrl: string;

  constructor(private http: HttpClient) {
    this.diagnosisUrl = 'http://localhost:8080/diagnoses';
  }

  public findAll(): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(this.diagnosisUrl);
  }

  public save(diagnosis: Diagnosis) {
    return this.http.post<Diagnosis>(this.diagnosisUrl, diagnosis);
  }
}

