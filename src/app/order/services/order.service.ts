import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

    public update(details: OrderDetails): void {
        Object.entries(details).forEach(([key, value]) => {
            this.orderFormGroup.get(key).setValue(value);
        });
    }
}
