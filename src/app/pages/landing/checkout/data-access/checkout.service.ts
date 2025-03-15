import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../core/constants/environments';
import { CartService } from '../../../../shared/components/cart/data-access/cart.service';
import { Order } from '../models/order.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private http = inject(HttpClient);
  private urlBase = environments.apiUrl;
  private cartService = inject(CartService);

  confirmOrder(data: Order)
  {
    return this.http.post(this.urlBase + '/orders', data).pipe(
      catchError(e => {
        console.error('Error al crear pedido:', e);
        return throwError(() => e);
      })
    );
  }
}
