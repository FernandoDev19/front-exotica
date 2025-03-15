import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeadset, faRepeat, faTruck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-benefits',
  imports: [FontAwesomeModule, NgStyle],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.css'
})
export class BenefitsComponent {
  faTruck: IconDefinition = faTruck;
  faRepeat: IconDefinition = faRepeat;
  faHeadset: IconDefinition = faHeadset;
  isMobile = input.required<boolean>();
}
