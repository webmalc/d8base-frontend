import { Component, Input } from '@angular/core';
import { Profile, Search, ServiceList } from '@app/api/models';
import { HelperService } from '@app/core/services/helper.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Select(CurrentUserSelectors.userId)
  public userId$: Observable<Profile['id']>;

  @Input() public data: Search;
  private isMoreServicesClicked: boolean = false;

  public onMoreServicesClick(): void {
    this.isMoreServicesClicked = true;
  }

  public declineReviews(num: number): string {
    return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }

  public needToRenderMoreServicesBtn(): boolean {
    return this.data.services.length > 3 && !this.isMoreServicesClicked;
  }

  public getServiceList(): ServiceList[] {
    return this.isMoreServicesClicked ? this.data.services : this.data.services.slice(0, 3);
  }

  public getCompanyName(): string {
    return this.data?.professional?.company ? this.data.professional.company : 'global.professional.private-person';
  }

  public getPhoto(): string {
    return this.data.professional.user?.avatar || HelperService.getNoAvatarLink();
  }
}
