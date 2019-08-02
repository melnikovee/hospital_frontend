import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctorSpecialty} from '../_models/doctorspecialty';
import {Specialty} from '../_models/specialty';
import {PatientSpecialShift} from '../_models/patient-special-shift';


@Injectable({
  providedIn: 'root'
})
export class PatientSpecialShiftService {

  private patientSpecialShiftUrl: string;

  constructor(private http: HttpClient) {
    this.patientSpecialShiftUrl = 'http://localhost:8080/patient_special_shifts';
  }

  public findAll(): Observable<PatientSpecialShift[]> {
    return this.http.get<PatientSpecialShift[]>(this.patientSpecialShiftUrl);
  }

  public findPatientSpecialShifts(id: number): Observable<PatientSpecialShift[]> {
    return this.http.get<PatientSpecialShift[]>(`${this.patientSpecialShiftUrl}/${id}`);
  }

  public save(patientSpecialShift: PatientSpecialShift) {
    return this.http.post<PatientSpecialShift>(this.patientSpecialShiftUrl, patientSpecialShift);
  }

  // tslint:disable-next-line:no-any
  deleteOnePatientSpecialShift(patinetId: number, specialShiftId: number): Observable<any> {
    return this.http.delete(`${this.patientSpecialShiftUrl}/${'delete'}/${patinetId}/${specialShiftId}`);
  }
}

