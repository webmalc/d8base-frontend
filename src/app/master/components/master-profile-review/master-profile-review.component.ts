import {Component, Input} from '@angular/core';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {PublicReview} from '@app/master/models/public-review';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-master-profile-review',
    templateUrl: './master-profile-review.component.html',
    styleUrls: ['./master-profile-review.component.scss'],
})
export class MasterProfileReviewComponent {

    @Input() public publicReview: PublicReview;

    public getRatingTitle(): string {
        return HelperService.getRatingTitle(this.publicReview.rating);
    }

    public getDate(): string {
        return HelperService.fromDatetime(this.publicReview.created).date;
    }

    public getUser(): PartialUserInterface {
        return plainToClass(User, this.publicReview.user, {excludeExtraneousValues: true});
    }
}
