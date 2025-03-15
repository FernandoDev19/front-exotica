import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../core/constants/environments';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private urlBase = environments.apiUrl;

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.urlBase + '/blogs');
  }
}
