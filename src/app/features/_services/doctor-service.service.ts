import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doctor} from '../_models/doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorsUrl: string;

  constructor(private http: HttpClient) {
    this.doctorsUrl = 'http://localhost:8080/doctors';
  }

  public save(doctor: Doctor) {
    return this.http.post<Doctor>(this.doctorsUrl, doctor);
  }

  public getDoctorById(id: number) {
    return this.http.get<Doctor>(`${this.doctorsUrl}/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor) {
    return this.http.put(`${this.doctorsUrl}/${id}`, doctor);
  }
}
