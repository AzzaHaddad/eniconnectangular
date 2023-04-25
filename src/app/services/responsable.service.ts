import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../models/responsable.model';
import { API_ENDPOINT } from '../config';


@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http: HttpClient) { }

  // Get all responsables
  getAllResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${API_ENDPOINT}/responsable/getall`);
  }

  // Add a responsable
  addResponsable(responsable: Responsable): Observable<number> {
    return this.http.post<number>('/responsable/add', responsable);
  }

  // Delete a responsable by email
  deleteResponsable(email: string): Observable<void> {
    return this.http.delete<void>(`/responsable/delete?email=${email}`);
  }

  
}
