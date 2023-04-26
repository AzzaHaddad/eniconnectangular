import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande';
import { API_ENDPOINT } from '../config';
import { AuthService} from '../authentication/auth.service'




@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private baseUrl = `${API_ENDPOINT}/demandes`;


  constructor(private http: HttpClient, private authService :AuthService) { }


  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}/alldemandes`);
  }
  getAllDemandesByEtudiant(cin: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}/alldemandesByCin`, { params: { cin } });
  }

  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.baseUrl}/${id}`);
  }

  createDemande(objet: string, contenu: string): Observable<number> {
    const params = new HttpParams()
      .set('objet', objet)
      .set('contenu', contenu)
      .set('cin', this.authService.getCin()!);
  
    return this.http.post<number>(`${this.baseUrl}/createDemande`, null, { params });
  }

  updateDemande(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.baseUrl}/updateDemande/${id}`, demande);
  }

  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDemande/${id}`, { responseType: 'text' });
  }
}
