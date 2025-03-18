import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminHeaderComponent } from "../admin/admin-header/admin-header.component";
import { HeaderComponent } from "../store/header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../pages/admin/auth/data-access/auth.service';

@Component({
  selector: 'app-dynamic-header',
  imports: [AdminHeaderComponent, HeaderComponent],
  template: `
    @if(isAdminRoute){
      @if(isAuthenticated){
        <app-admin-header></app-admin-header>
      }
    }
    @else {
      <app-header></app-header>
    }
  `
})
export class DynamicHeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  get isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
