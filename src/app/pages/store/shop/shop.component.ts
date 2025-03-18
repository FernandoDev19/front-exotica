import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/components/products/models/product.model';
import { ProductService } from '../../../shared/components/products/data-access/product.service';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { ProductComponent } from "../../../shared/components/products/ui/product.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  imports: [FontAwesomeModule, RouterLink, ScrollingModule, AsyncPipe, ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  faChevronRight = faChevronRight;
  faSearch = faSearch;
  protected $products!: Observable<Product[]>;
  private productService: ProductService = inject(ProductService);
  private platformId: Object = inject(PLATFORM_ID);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('Shop | Exotica');
    this.$products = this.productService.getProducts();
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
