import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '@app/message/models/message';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {NavParams} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-context-menu-popover',
    templateUrl: './context-menu-popover.component.html',
    styleUrls: ['./context-menu-popover.component.scss'],
})
export class ContextMenuPopoverComponent extends Reinitable implements OnInit, OnDestroy {

    public static delete$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
    public static update$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
    public message: Message;

    constructor(private navParams: NavParams) {
        super();
    }

    public ngOnInit(): void {
        this.message = this.navParams.get<Message>('message');
    }

    public ngOnDestroy(): void {
        this.message = undefined;
        ContextMenuPopoverComponent.delete$.next(null);
        ContextMenuPopoverComponent.update$.next(null);
    }

    public delete(): void {
        ContextMenuPopoverComponent.delete$.next(this.message);
    }

    public update(): void {
        ContextMenuPopoverComponent.update$.next(this.message);
    }
}
