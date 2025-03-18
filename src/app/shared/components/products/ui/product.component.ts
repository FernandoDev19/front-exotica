import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { Product } from '../models/product.model';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faCheck, faHeart, faSearch, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../store/cart/data-access/cart.service';
import { DialogService } from '../features/product-details/data-access/dialog.service';

@Component({
  selector: 'app-product',
  imports: [FontAwesomeModule, CurrencyPipe, NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  faSearch: IconDefinition = faSearch;
  faCartShopping: IconDefinition = faCartShopping;
  faHeart: IconDefinition = faHeart;
  faStar: IconDefinition = faStar;
  faStarHalf: IconDefinition = faStarHalf;
  faCheck = faCheck;

  product = input.required<Product>();
  productSelected = output<Product>();
  productToCart = output<Product>();
  isProductInCart!: boolean;

  private dialogService = inject(DialogService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.isProductInCart = this.cartService.productInCart(this.product().id);
  }

  protected getFullStars(qualification: number): number[] {
    if (qualification <= 0) {
      return []; // Retorna un array vacío si no hay calificación
    }
    return Array.from({ length: Math.floor(qualification) }).map((_, index) => index + 1);
  }

  protected hasHalfStar(qualification: number): boolean {
    if (qualification <= 0) {
      return false; // No hay media estrella si la calificación es 0 o negativa
    }
    return qualification % 1 !== 0;
  }

  protected addProductToCart(){
    this.cartService.addNewProduct(this.product());
    this.isProductInCart = true;
  }

  protected showDialog(product: Product){
    this.dialogService.selectProduct(product);
  }

}
