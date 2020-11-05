import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {orderSteps} from '@app/order/order-steps';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnDestroy {
    public currentStepIndex: number;
    public steps = orderSteps;

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly router: Router) {
        this.subscribeToRouterEvents();
    }

    public get isFirstStep(): boolean {
        return this.currentStepIndex === 0;
    }

    public get isLastStep(): boolean {
        return this.currentStepIndex === orderSteps.length - 1;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public next(): void {
        const nextStepIndex = this.currentStepIndex + 1;
        this.router.navigate(['order', orderSteps[nextStepIndex].path]);
    }

    public back(): void {
        const prevStepIndex = this.currentStepIndex - 1;
        this.router.navigate(['order', orderSteps[prevStepIndex].path]);
    }

    public submit(): void {
        // TODO: Отсылать команду на сервер
    }

    private subscribeToRouterEvents(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => this.onNavigatedTo(event.urlAfterRedirects));
    }

    private onNavigatedTo(url: string): void {
        this.currentStepIndex = orderSteps.findIndex(step => url.endsWith(step.path));
    }
}
