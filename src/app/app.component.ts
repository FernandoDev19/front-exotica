import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/landing/header/header.component";
import { FooterComponent } from "./shared/landing/footer/footer.component";
import { CartComponent } from './shared/components/cart/cart.component';
import { PDialogComponent } from "./shared/products/features/product-details/product-details.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartComponent, PDialogComponent],
  template: `
    <div>
      <header class="flex flex-col max-w-[1680px] mx-auto bg-white sticky top-0 z-40">
        <app-header></app-header>
      </header>
      <main class="container mx-auto">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
    <app-product-details></app-product-details>
    <app-cart></app-cart>
  `,
})
export class AppComponent {

}
