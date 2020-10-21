import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssuanceFiltersSubmenu} from '@app/issuance/enums/issuance-filters-submenu';

@Component({
    selector: 'app-issuance-filters-submenu',
    templateUrl: './issuance-filters-submenu.component.html',
    styleUrls: ['./issuance-filters-submenu.component.scss'],
})
export class IssuanceFiltersSubmenuComponent implements OnInit {

    @Input() public defaultTab: string;
    @Output() public selectedTab: EventEmitter<string> = new EventEmitter<string>();
    public readonly submenu = IssuanceFiltersSubmenu;
    public activeTab: string;

    public selectTab(tabName: string): void {
        this.activeTab = tabName;
        this.selectedTab.emit(tabName);
    }

    public ngOnInit(): void {
        this.activeTab = this.defaultTab;
    }
}
