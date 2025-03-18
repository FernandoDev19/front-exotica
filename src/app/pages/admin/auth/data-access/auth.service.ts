import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environments } from '../../../../core/constants/environments';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private urlBase = environments.apiUrl;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  login(email: string, password: string): Observable<string> {
    return this.http
      .post(
        this.urlBase + '/auth/login',
        { email, password },
        { responseType: 'json' }
      )
      .pipe(
        tap((response: any) => {
          this.saveToken(response.accessToken);
          this.router.navigate(['/admin/home']);
        }),
        catchError((error) => {
          console.error('Error al iniciar sesión:', error.error.message);
          return throwError(() => error);
        })
      );
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp > currentTime) {
      return true;
    } else {
      return false;
    }
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  logout() {
    this.removeToken();
  }
}
