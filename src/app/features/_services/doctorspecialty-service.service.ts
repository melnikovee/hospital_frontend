import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctorSpecialty} from '../_models/doctorspecialty';
import {Specialty} from '../_models/specialty';


@Injectable({
  providedIn: 'root'
})
export class DoctorSpecialtyService {

  private doctorSpecialtiesUrl: string;

  constructor(private http: HttpClient) {
    this.doctorSpecialtiesUrl = 'http://localhost:8080/doctor_specialties';
  }

  public findAll(): Observable<DoctorSpecialty[]> {
    return this.http.get<DoctorSpecialty[]>(this.doctorSpecialtiesUrl);
  }

  public findDoctorSpecialties(id: number): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.doctorSpecialtiesUrl}/${id}`);
  }

  public save(doctorSpecialty: DoctorSpecialty) {
    return this.http.post<DoctorSpecialty>(this.doctorSpecialtiesUrl, doctorSpecialty);
  }

  public getNewSpecialtiesForDoctor(doctor: number): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.doctorSpecialtiesUrl}/${'get_new_specialties'}/${doctor}`);
  }

  // tslint:disable-next-line:no-any
  deleteOneDoctorSpecialty(doctor: number, specialty: number): Observable<any> {
    return this.http.delete(`${this.doctorSpecialtiesUrl}/${'delete'}/${doctor}/${specialty}`);
  }
}

