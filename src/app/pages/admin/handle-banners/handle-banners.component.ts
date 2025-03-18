import { Component, inject, OnInit } from '@angular/core';
import { AdminBannerCreateComponent } from './admin-banner-create/admin-banner-create.component';
import { AdminBannerListComponent } from './admin-banner-list/admin-banner-list.component';
import { Title } from '@angular/platform-browser';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-handle-banners',
  imports: [FontAwesomeModule, AdminBannerCreateComponent, AdminBannerListComponent, RouterLink],
  templateUrl: './handle-banners.component.html',
  styleUrl: './handle-banners.component.css'
})
export class HandleBannersComponent implements OnInit {
  private title = inject(Title);
  protected isMobile!: boolean;
  protected content!: string;

  // Icons
  faChevronRight = faChevronRight;

  ngOnInit(): void {
    this.title.setTitle('Banners | Exotica');
  }

  protected handleContent(option: 'crear' | 'listar' | 'default') {
    const acceptedOptions = ['crear', 'listar', 'default'];
    if(!acceptedOptions.includes(option)){
      alert('Esta opción no existe o no esta disponible');
      return;
    }

    this.content = option;
  }
}
