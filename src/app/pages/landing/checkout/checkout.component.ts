import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ResumeComponent } from './resume/resume.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CheckoutService } from './data-access/checkout.service';
import { Order } from './models/order.model';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentMethods } from './enums/payment-methods.enum';
import { CartService } from '../../../shared/components/cart/data-access/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ResumeComponent, CheckoutFormComponent],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private platformId: Object = inject(PLATFORM_ID);
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  @ViewChild('checkoutResume') checkoutResume!: ResumeComponent;
  @ViewChild('checkoutForm') checkoutForm!: CheckoutFormComponent;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  save(){
    const checkoutForm = this.checkoutForm.checkoutForm;
    const resume = this.checkoutResume;
    if(checkoutForm.valid){
      const data: Order = {
        fullname: checkoutForm.get('name')?.value,
        email: checkoutForm.get('email')?.value,
        phone: checkoutForm.get('phone')?.value,
        department: checkoutForm.get('department')?.value,
        city: checkoutForm.get('city')?.value,
        address: checkoutForm.get('address')?.value,
        postal_code: checkoutForm.get('postal_code')?.value,
        order_date: new Date(),
        order_status: OrderStatus.PENDIENTE,
        payment_method: PaymentMethods.TRANSFERENCIA,
        total: resume.getTotal(),
        mailing_address: checkoutForm.get('address')?.value,
        products: resume.products.map(item => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
            subtotal: item.product.offer ? (item.product.offer * item.quantity) : (item.product.price * item.quantity)
          }
        })
      };

      this.checkoutService.confirmOrder(data).subscribe({
        next: order => {
          console.log('Pedido creado exitosamente.', order);
          this.cartService.clearCart();
          alert("Pedido creado exitosamente.");
        },
        error: e => {
          console.error('Error al crear pedido.', e.error.message);
          alert("Error al crear pedido.");
        }
      });
    }else{
      alert("Formulario invalido. Inténtelo nuevamente");
    }
  }
}

