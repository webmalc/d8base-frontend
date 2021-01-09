import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchFiltersSubmenu} from '@app/search/enums/search-filters-submenu';

@Component({
    selector: 'app-search-filters-submenu',
    templateUrl: './search-filters-submenu.component.html',
    styleUrls: ['./search-filters-submenu.component.scss'],
})
export class SearchFiltersSubmenuComponent implements OnInit {

    @Input() public defaultTab: string;
    @Output() public selectedTab: EventEmitter<string> = new EventEmitter<string>();
    public readonly submenu = SearchFiltersSubmenu;
    public activeTab: string;

    public selectTab(tabName: string): void {
        this.activeTab = tabName;
        this.selectedTab.emit(tabName);
    }

    public ngOnInit(): void {
        this.activeTab = this.defaultTab;
    }
}
