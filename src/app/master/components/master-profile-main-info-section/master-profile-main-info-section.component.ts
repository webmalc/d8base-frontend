import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {MainInfoSectionComponentInputDataInterface} from '@app/master/interfaces/main-info-section-component-input-data-interface';

@Component({
    selector: 'app-master-profile-main-info-section',
    templateUrl: './master-profile-main-info-section.component.html',
    styleUrls: ['./master-profile-main-info-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterProfileMainInfoSectionComponent {
    @Input() public sectionData: MainInfoSectionComponentInputDataInterface;

    public declinationReviews(num: number): string {
        return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
    }

    public ratingToNumber(): number {
        return parseFloat(this.sectionData.rating);
    }
}
