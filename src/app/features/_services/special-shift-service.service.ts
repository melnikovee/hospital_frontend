import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpecialShift} from '../_models/special-shift';

@Injectable({
  providedIn: 'root'
})
export class SpecialShiftService {

  private specialShiftsUrl: string;

  constructor(private http: HttpClient) {
    this.specialShiftsUrl = 'http://localhost:8080/special_shifts';
  }

  public findAll(): Observable<SpecialShift[]> {
    return this.http.get<SpecialShift[]>(this.specialShiftsUrl);
  }

  public getSpecialtyById(id: number): Observable<SpecialShift> {
    return this.http.get<SpecialShift>(`${this.specialShiftsUrl}/${id}`);
  }

  public save(specialShift: SpecialShift) {
    return this.http.post<SpecialShift>(this.specialShiftsUrl, specialShift);
  }

  // tslint:disable-next-line:no-any
  deleteSpecialty(id: number): Observable<any> {
    return this.http.delete(`${this.specialShiftsUrl}/${id}`);
  }

  updateSpecialShift(id: number, specialShift: SpecialShift) {
    return this.http.put(`${this.specialShiftsUrl}/${id}`, specialShift);
  }
}

