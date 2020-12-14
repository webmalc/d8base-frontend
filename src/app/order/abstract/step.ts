import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { StepContext, StepState } from '../order-steps';

@Component({
    template: ''
})
export abstract class StepComponent<T extends any> implements OnDestroy {
    public outputData$ = new EventEmitter<StepState<T>>();
    protected context: StepContext = null;

    protected readonly ngDestroy$ = new Subject<void>();

    constructor(protected readonly cd: ChangeDetectorRef) {}

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    public setState(state: StepState<T>): void {
        this.onStateChanged(state?.data);
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
