import { Component, Input } from '@angular/core';
import { Review } from '@app/core/models/review';

@Component({
    selector: 'app-reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent {

    @Input() public list: Review[] = [];
}
