import { Component, OnInit } from '@angular/core';
import {Review} from '@app/core/models/review';
import {ReviewsApiService} from '@app/core/services/reviews-api.service';

@Component({
    selector: 'app-reviews-tab',
    templateUrl: './reviews-tab.component.html',
    styleUrls: ['./reviews-tab.component.scss'],
})
export class ReviewsTabComponent implements OnInit {

    public reviewsList: Review[] = [];

    constructor(private reviewsApi: ReviewsApiService) { }

    public ngOnInit(): void {
        this.reviewsApi.get().subscribe(
            raw => this.reviewsList = raw.results
        );
    }

}
