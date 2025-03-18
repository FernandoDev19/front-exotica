import { Component, inject, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { CartService } from './data-access/cart.service';
import { CartProduct } from './model/cart.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../../products/models/product.model';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    DrawerModule,
    FontAwesomeModule,
    NgFor,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  protected isCartVisible!: boolean;
  protected productsInCart: CartProduct[] = [];
  private cartService: CartService = inject(CartService);
  private router = inject(Router);

  //ICons
  faStar = faStar;
  faStarHalf = faStarHalf;

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((products) => {
      this.productsInCart = products;
    });
    this.cartService
      .visibleCart()
      .subscribe((isVisible) => (this.isCartVisible = isVisible));
  }

  protected getFullStars(qualification: number): number[] {
    if (qualification <= 0) {
      return []; // Retorna un array vacío si no hay calificación
    }
    return Array.from({ length: Math.floor(qualification) }).map((_, index) => index + 1);
  }

  protected hasHalfStar(qualification: number): boolean {
    if (qualification <= 0) {
      return false;
    }
    return qualification % 1 !== 0;
  }

  protected addProductToCart(product: Product) {
    this.cartService.addNewProduct(product);
  }

  protected removeProductOfCart(product: Product, i: number) {
    this.cartService.removeProduct(product, i);
  }

  protected getTotalQuantity(): number {
    return this.productsInCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  protected getSubtotal(): number {
    return this.productsInCart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  protected getTotalDiscount(): number {
    return this.productsInCart.reduce((total, item) => {
      const offer = item.product.offer || 0;
      const price = item.product.price;

      if (offer > 0 && offer < price) {
        const discountPerUnit = price - offer;
        const discountForItem = discountPerUnit * item.quantity;
        return total + discountForItem;
      }

      return total;
    }, 0);
  }

  protected getTotal(): number {
    return this.productsInCart.reduce((total, item) => {
      const price = item.product.offer || item.product.price;
      return total + price * item.quantity;
    }, 0);
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }

  protected checkout(): void {
    if (this.productsInCart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    this.router.navigate(['/checkout']);
    this.isCartVisible = false;
  }
}
