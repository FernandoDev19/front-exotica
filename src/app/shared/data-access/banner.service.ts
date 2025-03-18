import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, retry, share, throwError } from 'rxjs';
import { Banner } from '../models/banner.model';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../core/constants/environments';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private http = inject(HttpClient);

  private urlBase = environments.apiUrl + '/banners';

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.urlBase).pipe(
      share(),
      catchError(e => {
        console.error('Error al obtener banners.', e.error.message);
        return of([]);
      })
    );
  }

  delete(bannerId: number){
    return this.http.delete(this.urlBase + '/' + bannerId).pipe(
      retry(2),
      catchError(e => {
        return throwError(() => e);
      })
    );
  }
}
