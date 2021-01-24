import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
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
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
