import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {MasterProfileCalendarComponent} from '@app/master/components/master-profile-calendar/master-profile-calendar.component';
import {MasterProfileInfoComponent} from '@app/master/components/master-profile-info/master-profile-info.component';
import {MasterProfilePortfolioComponent} from '@app/master/components/master-profile-portfolio/master-profile-portfolio.component';
import {MasterProfileServicesComponent} from '@app/master/components/master-profile-services/master-profile-services.component';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-master-profile-factory',
    templateUrl: './master-profile-factory.component.html',
    styleUrls: ['./master-profile-factory.component.scss'],
})
export class MasterProfileFactoryComponent implements OnInit, OnDestroy {

    @Input() public mode: Observable<string>;
    @Input() public editable: Observable<boolean>;
    private sub: Subscription;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
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
            case MasterProfileSubmenu.Services:
                const serviceComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileServicesComponent>(MasterProfileServicesComponent);
                const servicesC = this.viewContainerRef.createComponent<MasterProfileServicesComponent>(serviceComponentFactory);
                servicesC.instance.init();
                break;
            case MasterProfileSubmenu.Info:
                const infoComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileInfoComponent>(MasterProfileInfoComponent);
                const infoC = this.viewContainerRef.createComponent<MasterProfileInfoComponent>(infoComponentFactory);
                break;
            case MasterProfileSubmenu.Calendar:
                const calendarComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfileCalendarComponent>(MasterProfileCalendarComponent);
                this.viewContainerRef.createComponent<MasterProfileCalendarComponent>(calendarComponentFactory);
                break;
            case MasterProfileSubmenu.Portfolio:
                const portfolioComponentFactory =
                    this.componentFactoryResolver.resolveComponentFactory<MasterProfilePortfolioComponent>(MasterProfilePortfolioComponent);
                const portC = this.viewContainerRef.createComponent<MasterProfilePortfolioComponent>(portfolioComponentFactory);
                portC.instance.init();
                break;
            default:
                throw Error('unexpected component name');
        }
    }
}
