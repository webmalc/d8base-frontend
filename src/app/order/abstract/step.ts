import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import StepContext from '@app/order/interfaces/step-context.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    template: '',
})
export abstract class StepComponent<T> implements OnDestroy {
    public outputData: T;
    public isValid$ = new BehaviorSubject<boolean>(false);
    protected context: StepContext = null;

    protected readonly ngDestroy$ = new Subject<void>();

    constructor(protected readonly cd: ChangeDetectorRef) {}

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    public setState(state: T): void {
        this.onStateChanged(state);
        this.cd.markForCheck();
    }

    public setContext(context: StepContext): void {
        this.onContextChanged(context);
        this.cd.markForCheck();
    }

    protected abstract onStateChanged(data: T): void;

    protected onContextChanged(context: StepContext): void {
        this.context = context;
    }
}
