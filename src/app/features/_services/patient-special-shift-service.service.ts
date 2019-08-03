import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PatientSpecialShift} from '../_models/patient-special-shift';
import {SpecialShift} from '../_models/special-shift';
import {PatientFullName} from '../_models/patient-full-name';


@Injectable({
  providedIn: 'root'
})
export class PatientSpecialShiftService {

  private patientSpecialShiftUrl: string;

  constructor(private http: HttpClient) {
    this.patientSpecialShiftUrl = 'http://localhost:8080/patient_special_shifts';
  }

  public findPatientSpecialShifts(id: number): Observable<PatientSpecialShift[]> {
    return this.http.get<PatientSpecialShift[]>(`${this.patientSpecialShiftUrl}/${id}`);
  }

  public getPatientsBySpecialShiftId(id: number): Observable<PatientFullName[]> {
    return this.http.get<PatientFullName[]>(`${this.patientSpecialShiftUrl}/${'shifts'}/${id}`);
  }

  public getPatientSpecialShiftCard(id: number): Observable<SpecialShift[]> {
    return this.http.get<SpecialShift[]>(`${this.patientSpecialShiftUrl}/${'info'}/${id}`);
  }

  public save(patientSpecialShift: PatientSpecialShift) {
    return this.http.post<PatientSpecialShift>(this.patientSpecialShiftUrl, patientSpecialShift);
  }

  // tslint:disable-next-line:no-any
  deleteOnePatientSpecialShift(patinetId: number, specialShiftId: number): Observable<any> {
    return this.http.delete(`${this.patientSpecialShiftUrl}/${'delete'}/${patinetId}/${specialShiftId}`);
  }
}

