import { Component, input } from '@angular/core';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  offer = input<number>(1);
}
