import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { HelperService } from '@app/core/services/helper.service';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalCardComponent implements OnInit {
  @Input() public professional: ProfessionalList;
  public reviewsCount: number;
  public defaultAvatar = HelperService.getNoAvatarLink();

  constructor(private readonly communicationService: CommunicationService, private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.getReviewsCount();
  }

  public declineReviews(num: number): string {
    return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }

  private getReviewsCount(): void {
    this.communicationService.communicationReviewsList({ professional: `${this.professional.id}`, pageSize: 1 }).subscribe(reviews => {
      this.reviewsCount = reviews.count;
      this.cd.markForCheck();
    });
  }
}
