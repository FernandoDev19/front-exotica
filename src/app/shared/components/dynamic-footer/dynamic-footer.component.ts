import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFooterComponent } from "../admin/admin-footer/admin-footer.component";
import { FooterComponent } from "../store/footer/footer.component";

@Component({
  selector: 'app-dynamic-footer',
  imports: [AdminFooterComponent, FooterComponent],
  template: `
    @if(isAdminRoute){
      <app-admin-footer></app-admin-footer>
    }
    @else {
      <app-footer></app-footer>
    }
  `,
})
export class DynamicFooterComponent {
  private router = inject(Router);

  get isAdminRoute(){
    return this.router.url.startsWith('/admin');
  }
}
