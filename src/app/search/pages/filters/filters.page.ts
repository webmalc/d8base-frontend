import { Component, ViewChild } from '@angular/core';
import { SearchFilterStateService, SearchQueryService } from '@app/core/services';
import { ColumnHeaderComponent } from '@app/shared/components';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage {
  @ViewChild(ColumnHeaderComponent)
  public readonly header: ColumnHeaderComponent;

  constructor(public readonly state: SearchFilterStateService, public readonly query: SearchQueryService) {}

  public submit(): void {
    this.header.navigateBack();
  }

  public applyFilters(): void {
    this.query.searchByFormValue(this.state.form.value);
  }

  public reset(): void {
    this.state.form.reset();
  }
}
