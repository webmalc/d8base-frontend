import { Directive, EventEmitter, Input, Output } from '@angular/core';

// tslint:disable:directive-class-suffix
@Directive()
export abstract class AbstractEditComponent<T> {

    @Output() public saveEmitter: EventEmitter<T> = new EventEmitter<T>();
    @Output() public deleteEmitter: EventEmitter<T> = new EventEmitter<T>();
    @Input() public item: T;

    public save(): void {
        this.saveEmitter.emit(this.transform(this.item));
    }

    public delete(): void {
        this.deleteEmitter.emit(this.transform(this.item));
    }

    protected abstract transform(data: T): T;
}
