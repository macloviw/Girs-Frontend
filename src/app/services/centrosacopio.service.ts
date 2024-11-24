import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Importamos el AuthService para acceder al token

export interface CentroAcopio {
  id: number;
  nombre: string;
  provinciaCodigo: string;
  municipioCodigo: string;
  distritoMunicipalCodigo: string;
  activo: boolean;
  coordenadasUtm: string;
  latitud: string;
  longitud: string;
  capacidadTon: string;
  residuosToneladaMes: string;
  residuosAcopia: string;
  horario: string;
  createdAt: string | null;  // Asumiendo que es una fecha en formato string
  updatedAt: string | null;  // Asumiendo que es una fecha en formato string
}

@Injectable({
  providedIn: 'root'
})
export class CentrosAcopioService {
  private apiUrl = `${environment.apiUrl}api/centrosacopio`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener el encabezado con el token desde el AuthService
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCentrosAcopio(): Observable<CentroAcopio[]> {
    const headers = this.getHeaders();
    return this.http.get<CentroAcopio[]>(this.apiUrl, { headers });
  }

  getCentroAcopioById(id: number): Observable<CentroAcopio> {
    const headers = this.getHeaders();
    return this.http.get<CentroAcopio>(`${this.apiUrl}/${id}`, { headers });
  }

  createCentroAcopio(alcaldia: CentroAcopio): Observable<CentroAcopio> {
    const headers = this.getHeaders();
    return this.http.post<CentroAcopio>(this.apiUrl, alcaldia, { headers });
  }

  updateCentroAcopio(id: number, alcaldia: CentroAcopio): Observable<CentroAcopio> {
    const headers = this.getHeaders();
    return this.http.put<CentroAcopio>(`${this.apiUrl}/${id}`, alcaldia, { headers });
  }

  deleteCentroAcopio(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  obtenerCentrosAcopio(): Observable<CentroAcopio[]> {
    const headers = this.getHeaders();
    return this.http.get<CentroAcopio[]>(this.apiUrl, { headers });
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
