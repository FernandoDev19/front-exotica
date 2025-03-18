import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/store/store.routes') },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.routes') },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
