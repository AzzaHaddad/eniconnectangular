import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { API_ENDPOINT } from '../config';


@Injectable({
  providedIn: 'root'
})
export class EmploisService {
  private baseUrl = `${API_ENDPOINT}/emploiTemps`;

  constructor(private http: HttpClient  ) { }

  getEmploi(cin :number , semestre: number, annee: number): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}/consult?cin=${cin}&semestre=${semestre}&annee=${annee}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }
}
