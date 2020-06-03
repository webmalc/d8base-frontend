import {Component, Input, OnInit} from '@angular/core';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {Observable} from 'rxjs';

@Component({template: ''})
export abstract class AbstractListComponent<T extends {id: number}> implements OnInit {

    public items: T[] = [];

    @Input() public apiService: ApiServiceInterface<T>;
    @Input() public getPreparedModel: (data: T) => T;
    @Input() public getNewItem: () => T;

    public ngOnInit(): void {
        this.getItems().subscribe((data: T[]) => this.items = data);
    }

    public addNewItem(): void {
        this.items.push(this.getNewItem());
    }

    public saveItem(data: {index: number, item: T}): void {
        if (!data.item.id) {
            this.apiService.create(this.getPreparedModel(data.item)).subscribe(res => console.log(res));
        } else {
            this.apiService.patch(this.getPreparedModel(data.item)).subscribe(res => console.log(res));
        }
    }

    public deleteItem(data: {index: number, item: T}): void {
        if (data.item.id) {
            this.apiService.delete(data.item).subscribe(res => console.log(res));
        }
        this.items.splice(data.index, 1);
    }

    protected abstract getItems(): Observable<T[]>;
}

