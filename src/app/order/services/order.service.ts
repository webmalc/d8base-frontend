import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderPostModel} from '@app/core/models/order-model';
import {OrderDetails} from '@app/order/interfaces/order-details.interface';
import {Observable} from 'rxjs';

@Injectable()
export class OrderService {
    public order$: Observable<OrderDetails>;
    private readonly orderFormGroup = new FormGroup({
        date: new FormControl(null, Validators.required),
        time: new FormControl(null, Validators.required),
        location: new FormControl(null, Validators.required),
        comment: new FormControl('')
    });

    constructor() {
        this.order$ = this.orderFormGroup.valueChanges;
    }

    public get valid(): boolean {
        return this.orderFormGroup.valid;
    }

    public reset(): void {
        this.orderFormGroup.reset();
    }

    public update(details: OrderDetails): void {
        Object.entries(details).forEach(([key, value]) => {
            this.orderFormGroup.get(key).setValue(value);
        });
    }

    public getOrderModel(): OrderPostModel {
        const date = new Date(this.orderFormGroup.value.date).toDateString();
        const time = new Date(this.orderFormGroup.value.time).toTimeString();
        const comment = this.orderFormGroup.value.comment;

        return {
            service: null,
            start_datetime: new Date(`${date} ${time}`).toISOString(),
            note: comment
        };
    }
}
