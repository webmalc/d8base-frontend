import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { getNoAvatarLink } from '@app/core/functions/media.functions';
import { getProfessionalProfileUrl } from '@app/core/functions/navigation.functions';
import { declination } from '@app/core/functions/string.functions';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalCardComponent {
  @Input() public professional: ProfessionalList;
  public reviewsCount: number;
  public defaultAvatar = getNoAvatarLink();

  public get professionalName(): string {
    const user = this.professional.user;
    return user ? `${user.first_name} ${user.last_name}` : '';
  }

  public get professionalProfileUrl(): string {
    return getProfessionalProfileUrl(this.professional?.id) ?? '';
  }

  public declineReviews(num: number): string {
    return declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }
}
