import {EventEmitter, Input, Output} from '@angular/core';

// @Component({template: ''})
export abstract class AbstractEditComponent<T> {

    @Output() public saveEmitter: EventEmitter<T> = new EventEmitter<T>();
    @Output() public deleteEmitter: EventEmitter<T> = new EventEmitter<T>();
    @Input() public item: T;

    // @Input() public item: Observable<T>;

    public save(): void {
        // @ts-ignore
        // this.item.pipe(first()).subscribe(item => this.saveEmitter.emit(this.transform(item)));
        this.saveEmitter.emit(this.transform(this.item));
    }

    public delete(): void {
        // @ts-ignore
        // this.item.pipe(first()).subscribe(item => this.deleteEmitter.emit(this.transform(item)));
        this.deleteEmitter.emit(this.transform(this.item));
    }

    protected abstract transform(data: T): T;
}
