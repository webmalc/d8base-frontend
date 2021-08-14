import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { getProfessionalProfileUrl, getProfessionalReviewsUrl } from '@app/core/functions/navigation.functions';
import { getProfessionalName } from '@app/core/functions/professional.functions';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalCardComponent {
  @Input() public professional: ProfessionalList;

  public get professionalName(): string {
    return getProfessionalName(this.professional);
  }

  public get professionalProfileUrl(): string {
    return getProfessionalProfileUrl(this.professional?.id);
  }

  public get professionalReviewsUrl(): string {
    return getProfessionalReviewsUrl(this.professional?.id);
  }
}
