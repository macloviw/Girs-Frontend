import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/login`;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Método de login
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.apiUrl, { email, password }, { headers })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            // Guardar el token en localStorage
            localStorage.setItem(this.tokenKey, response.token);
          }
        })
      );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  logout() {
    // Elimina el token o cualquier dato de usuario guardado
    localStorage.removeItem('token'); // Ajusta el nombre del ítem según tu caso
    localStorage.removeItem('user');
    
    // Redirige al usuario a la página de inicio de sesión o cualquier otra
    this.router.navigate(['/auth/signin']);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
