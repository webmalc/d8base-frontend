import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalsService } from '@app/api/services';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { NgDestroyService, SearchQueryService } from '@app/core/services';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchFilterFormControls } from '@app/search/interfaces/search-filter-form-value.interface';

@Component({
  selector: 'app-basic-filters',
  templateUrl: './basic-filters.component.html',
  styleUrls: ['./basic-filters.component.scss'],
  providers: [NgDestroyService],
})
export class BasicFiltersComponent {
  public get controls(): SearchFilterFormControls {
    return this.state.controls;
  }

  public get form(): FormGroup {
    return this.state.form;
  }

  constructor(public readonly state: SearchFilterStateService) {}

  public updateLocation(location: ResolvedUserLocation): void {
    this.state.updateLocation(location);
  }
}
