import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { RatingPickerComponent } from './components/rating-picker/rating-picker.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
  declarations: [RatingPickerComponent, EditReviewComponent, ReviewsListComponent],
  imports: [CommonModule, SharedModule, IonicModule, TranslateModule, ReviewsRoutingModule, ReactiveFormsModule, FormsModule],
})
export class ReviewsModule {}
