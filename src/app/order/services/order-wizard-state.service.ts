import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OrderModel, OrderPostModel} from '@app/core/models/order-model';
import {MasterList} from '@app/master/models/master-list';
import {orderSteps} from '@app/order/order-steps';
import {Service} from '@app/service/models/service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class OrderWizardStateService {
    public order$ = new BehaviorSubject<Partial<OrderPostModel>>({});
    public master$ = new BehaviorSubject<MasterList>(null);
    public service$ = new BehaviorSubject<Service>(null);
    public result: OrderModel;

    private currentStepIndex: number = 0;

    constructor(
        private readonly router: Router
    ) {
    }

    private get serviceId(): number {
        return this.service$.value?.id;
    }

    public navigateToStep(increment: number): void {
        const nextStepIndex = this.currentStepIndex + increment;
        const step = orderSteps[nextStepIndex];
        if (step) {
            this.router.navigate(['order', this.serviceId, nextStepIndex])
                .then(() => this.currentStepIndex = nextStepIndex);
        }
    }

    public finalize(result: OrderModel): void {
        this.order$.next({});
        this.result = result;
        this.router.navigate(['order', 'done']).then();
    }

    public setContext(context: { service: Service, master: MasterList }): void {
        this.service$.next(context.service);
        this.master$.next(context.master);
    }

    public update(details: Partial<OrderPostModel>): void {
        this.order$.next({
            ...this.order$.value,
            ...details
        });
    }

    public getOrderModel(): OrderPostModel {
        return {
            service: null,
            ...this.order$.value as OrderPostModel
        };
    }

    public getMasterLocations(): ClientLocationInterface[] {
        return this.master$.value?.locations || [];
    }

    public getClientLocations(): ClientLocationInterface[] {
        return []; // TODO: get locations from current user profile
    }
}
