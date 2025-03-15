import { Component, inject, input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../shared/products/models/product.model';
import { ProductService } from '../../../../shared/products/data-access/product.service';
import { ProductComponent } from '../../../../shared/products/ui/product.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-selling-products',
  imports: [ProductComponent, AsyncPipe, RouterLink, NgIf],
  templateUrl: './best-selling-products.component.html',
  styleUrl: './best-selling-products.component.css'
})
export class BestSellingProductsComponent implements OnInit {
  protected $products!: Observable<Product[]>;
  private productService = inject(ProductService);
  isMobile = input.required<boolean>();

  ngOnInit(): void {
    this.$products = this.productService.getProducts('best-selling').pipe(
      map((products) => this.isMobile() ? products.slice(0, 4) : products.slice(0, 8))
    );
  }
}
