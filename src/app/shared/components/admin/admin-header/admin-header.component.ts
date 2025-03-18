import { Component, inject, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';
import { AuthService } from '../../../../pages/admin/auth/data-access/auth.service';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-admin-header',
  imports: [PopoverModule, FontAwesomeModule, SidebarComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @ViewChild('userPopover') userPopover!: Popover;
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  private authService = inject(AuthService);

  // Iconos
  faChevronDown = faChevronDown;

  protected logout(){
    this.authService.logout();
  }

}
