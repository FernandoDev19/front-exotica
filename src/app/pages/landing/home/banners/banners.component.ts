import { NgClass, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Banner } from './models/banner.model';
import { BannerService } from './data-access/banner.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../../shared/products/models/product.model';
import { CartService } from '../../../../shared/components/cart/data-access/cart.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/products/features/product-details/data-access/dialog.service';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [NgStyle, NgClass, FontAwesomeModule, NgIf],
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css'],
})
export class BannersComponent implements OnInit {
  protected banners!: Banner[];
  private bannerService = inject(BannerService);
  activeSlide = 0;
  isMobile = input.required<boolean>();
  isProductInCart: {productId: number; isInCart: boolean;}[] = [];

  private cartService = inject(CartService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  // Icons
  faCartShopping = faCartShopping;
  faCheck = faCheck;

  ngOnInit(): void {
    this.bannerService.getBanners().subscribe(banners => {
      this.banners = banners;
      banners.map(banner => {
        this.isProductInCart.push({productId: banner.product.id, isInCart: false});
      })
    });
  }

  nextSlide(): void {
    this.activeSlide = (this.activeSlide + 1) % this.banners.length;
  }

  prevSlide(): void {
    this.activeSlide = (this.activeSlide - 1 + this.banners.length) % this.banners.length;
  }

  getSlidePosition(index: number): number {
    return (index - this.activeSlide) * 100;
  }

  protected addProductToCart(product: Product){
    this.cartService.addNewProduct(product);
    const productInCart = this.isProductInCart.find(item => item.productId === product.id);
    if(productInCart){
      productInCart.isInCart = true;
    }
  }

  protected productInCart(productId: number){
    return this.isProductInCart.find(item => item.productId === productId)?.isInCart;
  }

  protected redirectToShop(){
    this.router.navigate(['/shop']);
  }

  protected checkout(product: Product): void {
    this.addProductToCart(product);
    this.router.navigate(['/checkout']);
  }

  protected showDialog(product: Product){
    this.dialogService.selectProduct(product);
  }
}
