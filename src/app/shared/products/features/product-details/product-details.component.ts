import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { DialogModule } from 'primeng/dialog';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  faCartShopping,
  faCheck,
  faStar,
  faStarHalf,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DialogService } from './data-access/dialog.service';
import { CartService } from '../../../components/cart/data-access/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [
    DialogModule,
    FontAwesomeModule,
    NgClass,
    CurrencyPipe,
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDialogComponent implements OnInit {
  protected product!: Product;
  protected $currentImage!: Observable<string>;
  protected isDialogVisible!: boolean;
  protected quantity: number = 1;
  isProductInCart!: boolean;

  private dialogService = inject(DialogService);
  private cartService = inject(CartService);
  private router = inject(Router);

  //Icons
  faStar: IconDefinition = faStar;
  faStarHalf: IconDefinition = faStarHalf;
  faCartShopping = faCartShopping;
  faCheck = faCheck;

  ngOnInit(): void {
    this.dialogService.getProductSelected().subscribe(product => {
      this.product = product;
      this.quantity = 1;
      this.isProductInCart = false;
    });
    this.$currentImage = this.dialogService.getCurrentImage();
    this.dialogService
      .DialogVisible()
      .subscribe((isVisible) => (this.isDialogVisible = isVisible));
    this.isProductInCart = this.cartService.productInCart(this.product.id);
  }

  protected changeCurrentImage(image: string) {
    this.dialogService.setCurrentImage(image);
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

  protected addProductToCart(){
    this.cartService.addNewProduct(this.product, this.quantity);
    this.isProductInCart = true;
  }

  protected increaseQuantity(): void {
    if (this.quantity < this.product.in_stock) {
      this.quantity++;
    }
  }

  protected decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  protected checkout(): void {
    this.addProductToCart();
    this.router.navigate(['/checkout']);
    this.dialogService.hideDialog();
  }
}
