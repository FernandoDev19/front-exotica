import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { BannersComponent } from "./banners/banners.component";
import { isPlatformBrowser } from '@angular/common';
import { OurProductsComponent } from "./our-products/our-products.component";
import { OffersComponent } from "./offers/offers.component";
import { BestSellingProductsComponent } from "./best-selling-products/best-selling-products.component";
import { BenefitsComponent } from "./benefits/benefits.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'landing-home',
  imports: [BannersComponent, OurProductsComponent, BestSellingProductsComponent, BenefitsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  protected isMobile!: boolean;
  private platformId: Object = inject(PLATFORM_ID);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Home | Exotica');
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.checkScreen();
    }
  }

  @HostListener('window:resize', ['$event'])
  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobile = width <= 768;
    }
  }
}
