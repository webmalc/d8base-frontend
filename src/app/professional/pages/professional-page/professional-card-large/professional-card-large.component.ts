import { Component, Input } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { getProfessionalName } from '@app/core/functions/professional.functions';
import { declination } from '@app/core/functions/string.functions';

@Component({
  selector: 'app-professional-card-large',
  templateUrl: './professional-card-large.component.html',
  styleUrls: ['./professional-card-large.component.scss'],
})
export class ProfessionalCardLargeComponent {
  @Input() public professional: ProfessionalList;
  @Input() public reviewsCount: number;
  @Input() public canEdit: boolean;

  public get professionalUserName(): string {
    return getProfessionalName(this.professional);
  }

  public declineReviews(num: number): string {
    return declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }
}
