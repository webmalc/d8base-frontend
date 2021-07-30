import { Component, Input } from '@angular/core';
import { Profile, Search, ServiceList } from '@app/api/models';
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

  public needToRenderMoreServicesBtn(): boolean {
    return this.data.services.length > 3 && !this.isMoreServicesClicked;
  }

  public getServiceList(): ServiceList[] {
    return this.isMoreServicesClicked ? this.data.services : this.data.services.slice(0, 3);
  }

  public getCompanyName(): string {
    return this.data?.professional?.company ? this.data.professional.company : 'global.professional.private-person';
  }
}
