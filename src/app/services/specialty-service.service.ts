import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Specialty} from '../models/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private specialtiesUrl: string;

  constructor(private http: HttpClient) {
    this.specialtiesUrl = 'http://localhost:8080/specialties';
  }

  public findAll(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.specialtiesUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public find(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.specialtiesUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(specialty: Specialty) {
    return this.http.post<Specialty>(this.specialtiesUrl, specialty, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteSpecialty(id: number): Observable<Object> {
    return this.http.delete(`${this.specialtiesUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
