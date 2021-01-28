import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import { EditReviewCommentComponent } from './components/edit-review-comment/edit-review-comment.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';

const routes: Routes = [
  {
    path: ':professionalId',
    pathMatch: 'full',
    component: ReviewsListComponent,
  },
  {
    path: ':professionalId/edit-review',
    pathMatch: 'full',
    component: EditReviewComponent,
    canActivate: [MainGuard],
  },
  {
    path: ':professionalId/edit-comment/:reviewId',
    pathMatch: 'full',
    component: EditReviewCommentComponent,
    canActivate: [MainGuard],
  },
  {
    path: ':professionalId/edit-comment',
    pathMatch: 'full',
    redirectTo: ':professionalId',
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
