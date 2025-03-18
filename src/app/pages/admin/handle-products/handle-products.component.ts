import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AdminProductListComponent } from "./admin-product-list/admin-product-list.component";
import { AdminProductCreateComponent } from "./admin-product-create/admin-product-create.component";
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-handle-products',
  imports: [FontAwesomeModule, AdminProductListComponent, AdminProductCreateComponent, RouterLink],
  templateUrl: './handle-products.component.html',
  styleUrl: './handle-products.component.css',
})
export class HandleProductsComponent implements OnInit {
  private title = inject(Title);
  protected isMobile!: boolean;
  protected content!: string;

  // Icons
  faChevronRight = faChevronRight;

  ngOnInit(): void {
    this.title.setTitle('Products | Exotica');
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
