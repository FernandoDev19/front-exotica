import { Routes } from "@angular/router";

export default [
  { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
  { path: 'shop', loadComponent: () => import('./shop/shop.component').then(c => c.ShopComponent) },
  { path: 'checkout', loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent) },
  { path: 'contact-us', loadComponent: () => import('./contact-us/contact-us.component').then(c => c.ContactUsComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
] as Routes;
