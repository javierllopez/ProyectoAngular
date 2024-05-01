import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { username, password })
      .pipe(
        // Manejar la respuesta y almacenar el token en el localStorage
        tap(response => {
          if (response && response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
          }
        })
      );
  }

  logout() {
    // Eliminar el token del localStorage al cerrar sesión
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    // Obtener el token del localStorage
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    // Verificar si el usuario está autenticado basado en la existencia del token en el localStorage
    return !!this.getToken();
  }
}
