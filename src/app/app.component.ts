import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DynamicFooterComponent } from "./shared/components/dynamic-footer/dynamic-footer.component";
import { CartComponent } from './shared/components/store/cart/cart.component';
import { PDialogComponent } from "./shared/components/products/features/product-details/product-details.component";
import { DynamicHeaderComponent } from './shared/components/dynamic-header/dynamic-header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartComponent, PDialogComponent, DynamicHeaderComponent, DynamicFooterComponent, NgIf],
  template: `
    <div>
      <app-dynamic-header></app-dynamic-header>
      <main class="container mx-auto">
        <router-outlet></router-outlet>
      </main>
      <app-dynamic-footer></app-dynamic-footer>
    </div>
    <app-product-details *ngIf="isStoreRoute"></app-product-details>
    <app-cart *ngIf="isStoreRoute"></app-cart>
  `,
})
export class AppComponent {
  private router = inject(Router);

  get isStoreRoute(){
    return !this.router.url.startsWith('/admin');
  }
}
