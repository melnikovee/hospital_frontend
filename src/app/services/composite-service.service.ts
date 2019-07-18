import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Composite} from '../models/composite';

@Injectable({
  providedIn: 'root'
})
export class CompositeService {

  private compositeUrl: string;

  constructor(private http: HttpClient) {
    this.compositeUrl = 'http://localhost:8080/composite';
  }

  public findAll(): Observable<Composite[]> {
    return this.http.get<Composite[]>(`${this.compositeUrl}/${'schedule'}`, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
