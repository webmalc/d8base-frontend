import {Component} from '@angular/core';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';

@Component({
    selector: 'app-main-page-review',
    templateUrl: './main-page-review.component.html',
    styleUrls: ['./main-page-review.component.scss']
})
export class MainPageReviewComponent {
    constructor(public readonly sanitizer: PhotoSanitizerService) {
    }
}
