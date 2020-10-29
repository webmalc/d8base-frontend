import {Component, EventEmitter, Output} from '@angular/core';
import {IssuanceFiltersSubmenu} from '@app/issuance/enums/issuance-filters-submenu';
import {IssuanceFilterStateInterface} from '@app/issuance/interfaces/issuance-filter-state-interface';
import {IssuanceFilterStateService} from '@app/issuance/services/issuance-filter-state.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-issuance-filters',
    templateUrl: './issuance-filters.component.html',
    styleUrls: ['./issuance-filters.component.scss']
})
export class IssuanceFiltersComponent {

    public defaultTab: string = IssuanceFiltersSubmenu.Main;
    public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
    @Output() public filtersData: EventEmitter<IssuanceFilterStateInterface> = new EventEmitter<IssuanceFilterStateInterface>();

    constructor(public readonly filtersStateManager: IssuanceFilterStateService) {
    }

    public submitFilters(): void {
        this.filtersData.emit(this.filtersStateManager.data);
    }
}
