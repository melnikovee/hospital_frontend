import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Specialty} from '../_models/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private specialtiesUrl: string;

  constructor(private http: HttpClient) {
    this.specialtiesUrl = 'http://localhost:8080/specialties';
  }

  public findAll(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.specialtiesUrl);
  }

  public find(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.specialtiesUrl}/${id}`);
  }

  public getSpecialtiesByDoctor(doctor: number): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.specialtiesUrl}/${'get_specialties'}/${doctor}`);
  }

  public save(specialty: Specialty) {
    return this.http.post<Specialty>(this.specialtiesUrl, specialty);
  }

  deleteSpecialty(id: number): Observable<Object> {
    return this.http.delete(`${this.specialtiesUrl}/${id}`);
  }
}
