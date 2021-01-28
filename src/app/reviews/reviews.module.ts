import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditReviewCommentComponent } from './components/edit-review-comment/edit-review-comment.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { RatingPickerComponent } from './components/rating-picker/rating-picker.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsService } from './services/reviews.service';

@NgModule({
  declarations: [RatingPickerComponent, EditReviewComponent, EditReviewCommentComponent, ReviewsListComponent, ReviewCardComponent],
  exports: [RatingPickerComponent, EditReviewComponent, EditReviewCommentComponent, ReviewsListComponent, ReviewCardComponent],
  imports: [CommonModule, SharedModule, IonicModule, TranslateModule, ReviewsRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [ReviewsService],
})
export class ReviewsModule {}
