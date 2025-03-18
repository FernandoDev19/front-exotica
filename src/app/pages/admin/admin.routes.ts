import { Routes } from "@angular/router";
import { authGuard } from "./auth/guards/auth.guard";

export default [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent), canActivate: [authGuard] },
  { path: 'handle-products', loadComponent: () => import('./handle-products/handle-products.component').then(c => c.HandleProductsComponent), canActivate: [authGuard] },
  { path: 'handle-banners', loadComponent: () => import('./handle-banners/handle-banners.component').then(c => c.HandleBannersComponent), canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
] as Routes;
