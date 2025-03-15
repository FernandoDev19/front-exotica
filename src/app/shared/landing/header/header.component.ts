import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../components/cart/data-access/cart.service';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  faFacebook: IconDefinition = faFacebook;
  faTwitter: IconDefinition = faTwitter;
  faInstagram: IconDefinition = faInstagram;
  faWhatsapp: IconDefinition = faWhatsapp;
  faCartShopping: IconDefinition = faCartShopping;
  faSearch: IconDefinition = faSearch;
  isMobileMenuOpen = false;
  protected itemsCount: number = 0;

  protected isMobile!: boolean;
  private platformId: Object = inject(PLATFORM_ID);
  private cartService: CartService = inject(CartService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
    this.cartService.getProducts().subscribe(products => this.itemsCount = products.length);
  }

  @HostListener('window:resize', ['$event'])
  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobile = width <= 768;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  showCart(){
    this.cartService.showCart();
  }
}
