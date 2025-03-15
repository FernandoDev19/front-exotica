import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Banner } from '../models/banner.model';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../../core/constants/environments';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private http = inject(HttpClient);
  private urlBase = environments.apiUrl;

  getBanners(): Observable<Banner[]>
  {
    return this.http.get<Banner[]>(this.urlBase + '/banners');
  }
}
