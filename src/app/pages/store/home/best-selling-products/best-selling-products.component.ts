import { Component, inject, input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../../../shared/components/products/models/product.model';
import { ProductService } from '../../../../shared/components/products/data-access/product.service';
import { ProductComponent } from '../../../../shared/components/products/ui/product.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-selling-products',
  imports: [ProductComponent, RouterLink],
  templateUrl: './best-selling-products.component.html',
  styleUrl: './best-selling-products.component.css'
})
export class BestSellingProductsComponent implements OnInit {
  protected products!: Product[];
  private productService = inject(ProductService);
  isMobile = input.required<boolean>();

  ngOnInit(): void {
     this.productService.getProducts('best-selling').pipe(
      map((products) => this.isMobile() ? products.slice(0, 4) : products.slice(0, 8))
    ).subscribe(products => {
      this.products = products;
    });
  }
}
