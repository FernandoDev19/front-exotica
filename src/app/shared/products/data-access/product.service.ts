import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, catchError, Observable, of, share } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../core/constants/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private urlBase = environments.apiUrl;

  getProducts(
    option?: 'best-selling' | 'news' | 'best-qualification'
  ): Observable<Product[]> {
    if (option) {
      return this.http
        .get<Product[]>(this.urlBase + '/products/' + option)
        .pipe(
          share(),
          catchError((e) => {
            console.error(e.error.message);
            return of([]);
          })
        );
    } else {
      return this.http
      .get<Product[]>(this.urlBase + '/products')
      .pipe(
        share(),
        catchError((e) => {
          console.error(e.error.message);
          return of([]);
        })
      );
    }
  }
}
