import { Component, EventEmitter, Output } from '@angular/core';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';

@Component({
  selector: 'app-professional-promo',
  templateUrl: './professional-promo.component.html',
  styleUrls: ['./professional-promo.component.scss'],
})
export class ProfessionalPromoComponent {
  @Output()
  public hideButtonClicked = new EventEmitter<void>();

  public get servicePublishUrl(): string[] {
    return [NavPath.Service, NavBranch.Publish];
  }
}
