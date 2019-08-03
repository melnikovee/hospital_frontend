import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Diagnosis} from '../_models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private diagnosisUrl: string;

  constructor(private http: HttpClient) {
    this.diagnosisUrl = 'http://localhost:8080/diagnoses';
  }

  public save(diagnosis: Diagnosis) {
    return this.http.post<Diagnosis>(this.diagnosisUrl, diagnosis);
  }
}

