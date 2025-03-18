import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../../../../shared/models/banner.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '../../../../shared/data-access/banner.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-banner-list',
  imports: [ScrollingModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './admin-banner-list.component.html',
  styleUrl: './admin-banner-list.component.css'
})
export class AdminBannerListComponent implements OnInit {
  protected $banners!: Observable<Banner[]>;
  private bannerService = inject(BannerService);

  // Icons
  faSearch = faSearch;

  ngOnInit(): void {
    this.$banners = this.bannerService.getBanners();
  }

  protected editBanner(banner: Banner){

  }

  protected deleteBanner(bannerId: number){
    this.bannerService.delete(bannerId).subscribe({
      next: () => {
        this.$banners = this.bannerService.getBanners();
        alert('Banner eliminado exitosamente');
      },
      error: (error) => {
        console.error('Error al eliminar banner:', error);
        alert('Error al eliminar el banner');
      }
    });
  }
}