import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctorSpecialty} from '../models/doctorspecialty';
import {Specialty} from '../models/specialty';

@Injectable()
export class DoctorSpecialtyService {

  private doctorSpecialtiesUrl: string;

  constructor(private http: HttpClient) {
    this.doctorSpecialtiesUrl = 'http://localhost:8080/doctor_specialties';
  }

  public findAll(): Observable<DoctorSpecialty[]> {
    return this.http.get<DoctorSpecialty[]>(this.doctorSpecialtiesUrl,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findDoctorSpecialties(id: number): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.doctorSpecialtiesUrl}/${id}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
  public save(doctorSpecialty: DoctorSpecialty) {
    return this.http.post<DoctorSpecialty>(this.doctorSpecialtiesUrl, doctorSpecialty,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getNewSpecialtiesForDoctor(doctor: number): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.doctorSpecialtiesUrl}/${'get_new_specialties'}/${doctor}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteOneDoctorSpecialty(doctor: number, specialty: number): Observable<Object> {
    return this.http.delete(`${this.doctorSpecialtiesUrl}/${'delete'}/${doctor}/${specialty}`,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.doctorSpecialtiesUrl}/${id}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
