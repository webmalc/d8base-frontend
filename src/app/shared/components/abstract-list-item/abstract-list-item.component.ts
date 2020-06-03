import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({template: ''})
export abstract class AbstractListItemComponent<T> {

    @Input() public item: T;
    @Input() public index: number;
    @Output() public saveEmitter: EventEmitter<{index: number, item: T}> = new EventEmitter<{index: number, item: T}>();
    @Output() public deleteEmitter: EventEmitter<{index: number, item: T}> = new EventEmitter<{index: number, item: T}>();

    public save(): void {
        this.saveEmitter.emit({index: this.index, item: this.item});
    }

    public delete(): void {
        this.deleteEmitter.emit({index: this.index, item: this.item});
    }
}
