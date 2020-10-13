import {Component, Input, OnInit} from '@angular/core';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {PublicReview} from '@app/master/models/public-review';

@Component({
    selector: 'app-master-profile-review',
    templateUrl: './master-profile-review.component.html',
    styleUrls: ['./master-profile-review.component.scss'],
})
export class MasterProfileReviewComponent implements OnInit {

    @Input() public publicReview: PublicReview;
    public tempUserData: User;

    constructor(private userManager: UserManagerService) {
    }

    public ngOnInit(): void {
        this.userManager.getCurrentUser().subscribe(user => this.tempUserData = user);
    }

    public getRatingTitle(): string {
        return HelperService.getRatingTitle(this.publicReview.rating);
    }

    public getDate(): string {
        return HelperService.fromDatetime(this.publicReview.created).date;
    }
}
