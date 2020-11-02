import {Component, Input} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';
import {SearchResultsInterface} from '@app/search/interfaces/search-results-interface';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

    @Input() public data: SearchResultsInterface;
    private isMoreServicesClicked: boolean = false;

    constructor(public readonly photoSanitizer: PhotoSanitizerService) {
    }

    public onMoreServicesClick(): void {
        this.isMoreServicesClicked = true;
    }

    public declineReviews(num: number): string {
        return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
    }

    public needToRenderMoreServicesBtn(): boolean {
        return (this.data.services.length > 3 && !this.isMoreServicesClicked);
    }

    public getServiceList(): Service[] {
        return this.isMoreServicesClicked ? this.data.services : this.data.services.slice(0, 3);
    }

    public getCompanyName(): string {
        return this.data?.master?.company ? this.data.master.company : 'global.master.private-person';
    }

    public getPrice(service: Service): string {
        return service.price.is_price_fixed ?
            Math.round(service.price.price).toString() :
            `${Math.round(service.price.start_price)} - ${service.price.end_price}`;
    }
}
