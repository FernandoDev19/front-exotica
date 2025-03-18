import { Component, inject, OnInit } from '@angular/core';
import { CartProduct } from '../../../../shared/components/store/cart/model/cart.model';
import { CartService } from '../../../../shared/components/store/cart/data-access/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../shared/components/products/models/product.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-resume',
  imports: [CurrencyPipe, NgFor, NgIf, FontAwesomeModule],
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  public products!: CartProduct[];

  //icons
  faStar = faStar;
  faStarHalf = faStarHalf;

  private cartService: CartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((products) => {
      if (products.length === 0 && this.router.url === '/checkout') {
        this.router.navigate(['/shop']);
      } else {
        this.products = products;
      }
    });
  }

  protected getFullStars(qualification: number): number[] {
    if (qualification <= 0) {
      return [];
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
    return this.products.reduce((total, item) => total + item.quantity, 0);
  }

  protected getSubtotal(): number {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  protected getTotalDiscount(): number {
    return this.products.reduce((total, item) => {
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

  public getTotal(): number {
    return this.products.reduce((total, item) => {
      const price = item.product.offer || item.product.price;
      return total + price * item.quantity;
    }, 0);
  }
}
