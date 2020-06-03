import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({template: ''})
export abstract class AbstractListComponent<T extends {id: number}> implements OnInit {

    public items: T[] = [];

    @Input() public apiService: ApiServiceInterface<T>;
    @Input() public getPreparedModel: (data: T) => T;
    @Input() public getNewItem: () => T;
    @Input() public interactive: boolean = true;

    public ngOnInit(): void {
        this.getItems().subscribe(
            (data: T[]) => this.items = data,
            (error: HttpErrorResponse) => error.status === 404 ? this.items = [] : throwError(error)
        );
    }

    public addNewItem(): void {
        this.items.push(this.getNewItem());
    }

    public saveItem(data: {index: number, item: T}): void {
        if (!data.item.id) {
            this.apiService.create(this.getPreparedModel(data.item)).pipe(
                tap(result => this.items[data.index].id = result.id)
            ).subscribe(res => console.log(res));
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

