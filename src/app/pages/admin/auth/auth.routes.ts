import { Routes } from "@angular/router";

export default [
  { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
  // { path: 'signup', loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
] as Routes;
