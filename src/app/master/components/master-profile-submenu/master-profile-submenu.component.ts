import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';

@Component({
    selector: 'app-master-profile-submenu',
    templateUrl: './master-profile-submenu.component.html',
    styleUrls: ['./master-profile-submenu.component.scss']
})
export class MasterProfileSubmenuComponent implements OnInit {
    @Input() public defaultTab: string;
    @Output() public selectedTab: EventEmitter<string> = new EventEmitter<string>();
    public readonly submenu = MasterProfileSubmenu;
    public activeTab: string;

    public selectTab(tabName: string): void {
        this.activeTab = tabName;
        this.selectedTab.emit(tabName);
    }

    public ngOnInit(): void {
        this.activeTab = this.defaultTab;
    }
}
