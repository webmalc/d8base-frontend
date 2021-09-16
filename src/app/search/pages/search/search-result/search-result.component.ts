import { Component, Input } from '@angular/core';
import { Profile, Search, ServiceList } from '@app/api/models';
import {
  getProfessionalScheduleUrl,
  getProfessionalServicesUrl,
  getServiceOrderUrl,
  getUserChatUrl,
} from '@app/core/functions/navigation.functions';
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

  public get professionalServicesUrl(): string {
    return getProfessionalServicesUrl(this.data.professional?.id);
  }

  public get professionalChatUrl(): string {
    return getUserChatUrl(this.data.professional?.user.id);
  }

  public get professionalScheduleUrl(): string {
    return getProfessionalScheduleUrl(this.data.professional.id);
  }

  public get serviceOrderUrl(): string {
    return getServiceOrderUrl(this.data.services[0].id);
  }

  public getServiceList(): ServiceList[] {
    return this.data.services.slice(0, 3);
  }

  public getServiceCount(): number {
    return this.data.services.length;
  }

  public get hasMoreServices(): boolean {
    return this.getServiceCount() > this.getServiceList().length;
  }
}
