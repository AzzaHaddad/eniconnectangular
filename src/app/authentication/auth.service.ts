import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';
import { API_ENDPOINT } from '../config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }
  
  responsableLogin(email: string, password: string) {
      const url = `${API_ENDPOINT}/responsable/signin`;
      console.log(url);
      return this.httpClient.post<any>(url, { email, password })
        .pipe(map(response => {
          if (response) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userType', 'responsable'); // Change to match the actual key name in the response
          }
          return response;
        }));
    }

    adminLogin(email: string, password: string) {
      const url = `${API_ENDPOINT}/responsable/signin`;
      console.log(url);
      return this.httpClient.post<any>(url, { email, password })
        .pipe(map(response => {
          if (response) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userType', 'admin'); // Change to match the actual key name in the response
          }
          return response;
        }));
    }
  
    etudiantLogin(email: string, password: string) {
      const url = `${API_ENDPOINT}/etudiants/signin`;
      console.log(url);
      return this.httpClient.post<any>(url, { email, password })
        .pipe(map(response => {
          if (response) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userType', 'etudiant'); // Change to match the actual key name in the response
          }
          return response;
        }));
    }

    logout() {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userType');
    }
  
    isLoggedIn(): boolean {
      return sessionStorage.getItem('isLoggedIn') === 'true';
    }
  
    getUserType(): string | null {
      return sessionStorage.getItem('userType');
    }
}
