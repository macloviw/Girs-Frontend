import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Importamos el AuthService para acceder al token

export interface Alcaldia {
  id: number;
  nombre: string;
  provinciaCodigo: string;
  municipioCodigo: string;
  distritoMunicipalCodigo: string;
  activo: boolean;
  createdAt: string | null;  // Asumiendo que es una fecha en formato string
  updatedAt: string | null;  // Asumiendo que es una fecha en formato string
}

@Injectable({
  providedIn: 'root'
})
export class AlcaldiasService {
  private apiUrl = `${environment.apiUrl}api/alcaldias`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener el encabezado con el token desde el AuthService
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAlcaldias(): Observable<Alcaldia[]> {
    const headers = this.getHeaders();
    return this.http.get<Alcaldia[]>(this.apiUrl, { headers });
  }

  getAlcaldiaById(id: number): Observable<Alcaldia> {
    const headers = this.getHeaders();
    return this.http.get<Alcaldia>(`${this.apiUrl}/${id}`, { headers });
  }

  createAlcaldia(alcaldia: Alcaldia): Observable<Alcaldia> {
    const headers = this.getHeaders();
    return this.http.post<Alcaldia>(this.apiUrl, alcaldia, { headers });
  }

  updateAlcaldia(id: number, alcaldia: Alcaldia): Observable<Alcaldia> {
    const headers = this.getHeaders();
    return this.http.put<Alcaldia>(`${this.apiUrl}/${id}`, alcaldia, { headers });
  }

  deleteAlcaldia(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  obtenerAlcaldias(): Observable<Alcaldia[]> {
    const headers = this.getHeaders();
    return this.http.get<Alcaldia[]>(this.apiUrl, { headers });
  }

  getProvincias() {
    return this.http.get<any[]>(`${environment.apiUrl}api/territorioprovincias`);
  }

  getMunicipios(provinciaCodigo: string) {
    return this.http.get<any[]>(`${environment.apiUrl}api/territoriomunicipios/byprovincia/${provinciaCodigo}`);
  }

  getDistritos(municipioCodigo: string) {
    return this.http.get<any[]>(`${environment.apiUrl}api/territoriodistritosmunicipales/bymunicipio/${municipioCodigo}`);
  } 


}
