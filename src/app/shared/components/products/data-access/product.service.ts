import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, catchError, Observable, of, share, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../../core/constants/environments';
import { AuthService } from '../../../../pages/admin/auth/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private urlBase = environments.apiUrl + '/products';
  private authService = inject(AuthService);

  createProduct(data: FormData)
  {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http.post(this.urlBase, data, { headers }).pipe(
      catchError(e => {
        return throwError(() => e.error.message);
      })
    );
  }

  getProducts(
    option?: 'best-selling' | 'news' | 'best-qualification'
  ): Observable<Product[]> {
    if (option) {
      return this.http
        .get<Product[]>(this.urlBase + '/' + option)
        .pipe(
          share(),
          catchError((e) => {
            console.error(e.error.message);
            return of([]);
          })
        );
    } else {
      return this.http
      .get<Product[]>(this.urlBase)
      .pipe(
        share(),
        catchError((e) => {
          console.error(e.error.message);
          return of([]);
        })
      );
    }
  }

  delete(id: number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.delete(this.urlBase + '/' + id, { headers }).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }
}
