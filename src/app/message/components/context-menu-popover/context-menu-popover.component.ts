import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '@app/message/models/message';
import {NavParams} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-context-menu-popover',
    templateUrl: './context-menu-popover.component.html',
    styleUrls: ['./context-menu-popover.component.scss'],
})
export class ContextMenuPopoverComponent implements OnDestroy, OnInit {

    public static delete$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
    public static update$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
    public message: Message;

    constructor(private readonly navParams: NavParams) {
    }

    public ngOnInit(): void {
        this.init();
    }

    public ngOnDestroy(): void {
        this.message = undefined;
        ContextMenuPopoverComponent.delete$.next(null);
        ContextMenuPopoverComponent.update$.next(null);
    }

    public delete(): void {
        ContextMenuPopoverComponent.delete$.next(this.message);
        // ContextMenuPopoverComponent.delete$.complete();
    }

    public update(): void {
        ContextMenuPopoverComponent.update$.next(this.message);
        // ContextMenuPopoverComponent.update$.complete();
    }

    protected init(): void {
        this.message = this.navParams.get<Message>('message');
    }
}
