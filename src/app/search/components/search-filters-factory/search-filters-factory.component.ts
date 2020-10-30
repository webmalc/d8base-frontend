import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
// tslint:disable-next-line:max-line-length
import {SearchFiltersAdditionalTabComponent} from '@app/search/components/search-filters-additional-tab/search-filters-additional-tab.component';
import {SearchFiltersMainTabComponent} from '@app/search/components/search-filters-main-tab/search-filters-main-tab.component';
import {SearchFiltersSubmenu} from '@app/search/enums/search-filters-submenu';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-search-filters-factory',
    templateUrl: './search-filters-factory.component.html',
    styleUrls: ['./search-filters-factory.component.scss']
})
export class SearchFiltersFactoryComponent implements OnInit, OnDestroy {

    @Input() public mode: Observable<string>;
    private sub: Subscription;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    public ngOnInit(): void {
        this.subscribeToMode();
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private subscribeToMode(): void {
        this.sub = this.mode.subscribe(mode => this.createComponent(mode));
    }

    private createComponent(component: string): void {
        this.viewContainerRef.clear();
        switch (component) {
            case SearchFiltersSubmenu.Main:
                const mainComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<SearchFiltersMainTabComponent>(SearchFiltersMainTabComponent);
                const main = this.viewContainerRef.createComponent<SearchFiltersMainTabComponent>(mainComponentFactory);
                main.instance.init();
                break;
            case SearchFiltersSubmenu.Additional:
                const additionalComponentFactory = this.componentFactoryResolver
                    .resolveComponentFactory<SearchFiltersAdditionalTabComponent>(SearchFiltersAdditionalTabComponent);
                this.viewContainerRef.createComponent<SearchFiltersAdditionalTabComponent>(additionalComponentFactory);
                break;
            default:
                throw Error('unexpected tab name');
        }
    }
}
