import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
// tslint:disable-next-line:max-line-length
import {IssuanceFiltersAdditionalTabComponent} from '@app/issuance/components/issuance-filters-additional-tab/issuance-filters-additional-tab.component';
import {IssuanceFiltersMainTabComponent} from '@app/issuance/components/issuance-filters-main-tab/issuance-filters-main-tab.component';
import {IssuanceFiltersSubmenu} from '@app/issuance/enums/issuance-filters-submenu';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-issuance-filters-factory',
    templateUrl: './issuance-filters-factory.component.html',
    styleUrls: ['./issuance-filters-factory.component.scss'],
})
export class IssuanceFiltersFactoryComponent implements OnInit, OnDestroy {

    @Input() public mode: Observable<string>;
    private sub: Subscription;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
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
            case IssuanceFiltersSubmenu.Main:
                const mainComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<IssuanceFiltersMainTabComponent>(IssuanceFiltersMainTabComponent);
                const main = this.viewContainerRef.createComponent<IssuanceFiltersMainTabComponent>(mainComponentFactory);
                main.instance.init();
                break;
            case IssuanceFiltersSubmenu.Additional:
                const additionalComponentFactory = this.componentFactoryResolver
                    .resolveComponentFactory<IssuanceFiltersAdditionalTabComponent>(IssuanceFiltersAdditionalTabComponent);
                this.viewContainerRef.createComponent<IssuanceFiltersAdditionalTabComponent>(additionalComponentFactory);
                break;
            default:
                throw Error('unexpected tab name');
        }
    }
}
