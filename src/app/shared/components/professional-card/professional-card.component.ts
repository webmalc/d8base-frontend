import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { HelperService } from '@app/core/services/helper.service';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalCardComponent {
  @Input() public professional: ProfessionalList;
  public reviewsCount: number;
  public defaultAvatar = HelperService.getNoAvatarLink();

  public getName(): string {
    const user = this.professional.user;
    return user ? `${user.first_name} ${user.last_name}` : '';
  }

  public declineReviews(num: number): string {
    return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }
}
