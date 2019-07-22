import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cabinet} from '../models/cabinet';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  private cabinetsUrl: string;

  constructor(private http: HttpClient) {
    this.cabinetsUrl = 'http://localhost:8080/cabinets';
  }

  public findAll(): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>(this.cabinetsUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(cabinet: Cabinet) {
    return this.http.post<Cabinet>(this.cabinetsUrl, cabinet, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteCabinet(id: number): Observable<Object> {
    return this.http.delete(`${this.cabinetsUrl}/${id}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
