import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReviewList } from '@app/api/models';

@Component({
  selector: 'app-review-cards',
  templateUrl: './review-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardsComponent {
  @Input()
  public reviews: ReviewList[];
}
