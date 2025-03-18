import { Component, inject, input, OnInit } from '@angular/core';
import { ProductComponent } from "../../../../shared/components/products/ui/product.component";
import { map } from 'rxjs';
import { Product } from '../../../../shared/components/products/models/product.model';
import { ProductService } from '../../../../shared/components/products/data-access/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-products',
  imports: [ProductComponent, RouterLink],
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.css',
})
export class OurProductsComponent implements OnInit {
  protected products!: Product[];
  private productService = inject(ProductService);
  isMobile = input.required<boolean>();
  activeSlide = 0;

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      map((products) => this.isMobile() ? products.slice(0, 4) : products.slice(0, 8))
    ).subscribe(products => {
      this.products = products;
    });
  }
}
