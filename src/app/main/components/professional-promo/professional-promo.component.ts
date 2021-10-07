import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-professional-promo',
  templateUrl: './professional-promo.component.html',
  styleUrls: ['./professional-promo.component.scss'],
})
export class ProfessionalPromoComponent {
  @Output()
  public hideButtonClicked = new EventEmitter<void>();
}
