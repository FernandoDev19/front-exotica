import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/landing/landing.routes') },
  { path: '**', redirectTo: '' }
];
