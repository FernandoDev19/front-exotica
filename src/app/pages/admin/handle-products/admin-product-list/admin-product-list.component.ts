import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../shared/components/products/models/product.model';
import { ProductService } from '../../../../shared/components/products/data-access/product.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, CurrencyPipe, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-admin-product-list',
  imports: [ScrollingModule, FontAwesomeModule, AsyncPipe, SlicePipe, CurrencyPipe, NgIf],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent implements OnInit {
  protected $products!: Observable<Product[]>;
  private productService = inject(ProductService);

  // Icons
  faSearch = faSearch;

  ngOnInit(): void {
    this.$products = this.productService.getProducts();
  }

  protected editProduct(product: Product){

  }

  protected deleteProduct(productId: number){
    this.productService.delete(productId).subscribe({
      next: () => {
        this.$products = this.productService.getProducts();
        alert('Producto eliminado exitosamente');
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    });
  }
}
