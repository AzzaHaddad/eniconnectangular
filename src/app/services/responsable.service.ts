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
    return this.http.post<number>(`${API_ENDPOINT}/responsable/add`, responsable);
  }

  // Delete a responsable by email
  deleteResponsable(email: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINT}/responsable/delete?email=${email}`);
  }

  updateResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.put<Responsable>(`${API_ENDPOINT}/responsable/update/${responsable.email}`, responsable);
  }

  
}
