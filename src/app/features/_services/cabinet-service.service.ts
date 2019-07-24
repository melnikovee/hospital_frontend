import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cabinet} from '../_models/cabinet';


@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  private cabinetsUrl: string;

  constructor(private http: HttpClient) {
    this.cabinetsUrl = 'http://localhost:8080/cabinets';
  }

  public findAll(): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>(this.cabinetsUrl);
  }

  public save(cabinet: Cabinet) {
    return this.http.post<Cabinet>(this.cabinetsUrl, cabinet);
  }

  deleteCabinet(id: number) {
    return this.http.delete(`${this.cabinetsUrl}/${id}`);
  }
}
