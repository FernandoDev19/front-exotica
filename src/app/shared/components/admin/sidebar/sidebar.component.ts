import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFirstOrder, faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faAd, faChartLine, faDollarSign, faHome, faQuestion, faUser } from '@fortawesome/free-solid-svg-icons';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = false;

  // Iconos
  faHome = faHome;
  faProducts = faProductHunt;
  faOrder = faFirstOrder;
  faUser = faUser;
  faBanners = faAd;
  faChartLine = faChartLine;
  faDollarSign = faDollarSign;
  faHelp = faQuestion;

  showSidebar(){
    this.isSidebarVisible = true;
  }
}
