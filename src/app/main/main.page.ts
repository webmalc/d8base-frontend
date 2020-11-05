import {Component} from '@angular/core';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage {

    constructor(public readonly sanitizer: PhotoSanitizerService) {
    }
}
