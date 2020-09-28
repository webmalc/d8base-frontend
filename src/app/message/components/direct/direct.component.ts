import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {TranslationService} from '@app/core/services/translation.service';
import {ContextMenuPopoverComponent} from '@app/message/components/context-menu-popover/context-menu-popover.component';
import {Message} from '@app/message/models/message';
import {DirectServiceService} from '@app/message/services/direct-service.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {IonContent, IonInfiniteScroll, Platform, PopoverController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';

@Component({
    selector: 'app-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss']
})
export class DirectComponent extends Reinitable implements OnDestroy {

    @ViewChild(IonInfiniteScroll) public infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent, {read: IonContent, static: false}) public content: IonContent;
    @ViewChild('bottomPoint', {read: ElementRef}) public bottom: ElementRef<HTMLElement>;
    @ViewChild('sentMenu', {read: ElementRef}) public sentMenu: ElementRef<HTMLElement>;
    public showContextIndex;
    public isUpdate: boolean = false;
    private updateMessageId: number;
    private deleteSubscription: Subscription;
    private updateSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        public directService: DirectServiceService,
        private platform: Platform,
        private popoverController: PopoverController,
        private trans: TranslationService
    ) {
        super();
    }

    public needToRenderDateString(messageIndex: number): Observable<boolean> {
        return this.directService.messages$.pipe(
            first(),
            map(messageList => {
                if (messageIndex === 0) {
                    return true;
                }

                return messageList[messageIndex].created.slice(0, 10) !== messageList[messageIndex - 1].created.slice(0, 10);
            })
        );
    }

    public getDateString(datetime: string): string {
        const date = new Date(datetime.slice(0, 10));

        return `${date.toLocaleString(this.trans.getCurrentLang(), {month: 'long'})}, ${date.getDate()}`;
    }

    public cancelUpdate(): void {
        if (this.isUpdate) {
            this.isUpdate = false;
            this.directService.clearMessage();
        }
    }

    public showUpdatingMessage(): void {
        const messageElement = document.getElementById(this.directService.updateMessage.id.toString(10));
        this.content.scrollToPoint(null, messageElement.offsetTop);
        let i = 0.6;
        const interval = setInterval(() => {
            if (i < 0) {
                clearInterval(interval);
                messageElement.style.backgroundColor = `rgba(12,209,232,0)`;

                return;
            }
            messageElement.style.backgroundColor = `rgba(12,209,232,${i})`;
            i -= 0.05;
        }, 100);
    }

    public resetContext(): void {
        this.showContextIndex = undefined;
    }

    public initMessageMenuContext(event: MouseEvent, message: Message): void {
        event.preventDefault();
        this.initContextMenuPopover(message, event);
    }

    public ionViewDidLeave(): void {
        this.ngOnDestroy();
    }

    public ngOnDestroy(): void {
        this.deleteSubscription?.unsubscribe();
        this.updateSubscription?.unsubscribe();
    }

    public loadData(): void {
        this.directService.appendNextApiPage().subscribe(_ => this.infiniteScroll.complete());
    }

    public send(): void {
        this.isUpdate ? this.directService.update(this.updateMessageId) : this.directService.send();
        this.isUpdate = false;
        this.updateMessageId = undefined;
    }

    public timeFromDatetime(datetime: string): string {
        return HelperService.fromDatetime(datetime).time;
    }

    public getCheckmarkColor(message: Message): string {
        return message.is_read ? 'success' : 'dark';
    }

    protected init(): void {
        this.directService.init(parseInt(this.route.snapshot.paramMap.get('interlocutor-id'), 10)).subscribe(
            _ => this.subscribeToNextApiPageUpdate()
        );
        this.directService.messagesListUpdated.subscribe(_ => this.scrollToBottom());
        this.directService.newMessageSent.subscribe(_ => this.scrollToBottom(true));
    }

    private initContextMenuPopover(message: Message, event: MouseEvent): void {
        this.updateMessageId = undefined;
        this.popoverController.create({
            component: ContextMenuPopoverComponent,
            translucent: true,
            componentProps: {message},
            animated: true,
            event
        }).then(pop => pop.present().then(
            () => {
                this.deleteSubscription = ContextMenuPopoverComponent.delete$.pipe(filter(mes => mes !== null), first()).subscribe(
                    (mes: Message) => {
                        this.directService.delete(mes).subscribe();
                        this.popoverController.dismiss();
                        this.deleteSubscription.unsubscribe();
                    }
                );
                this.updateSubscription = ContextMenuPopoverComponent.update$.pipe(filter(mes => mes !== null), first()).subscribe(
                    (mes: Message) => {
                        this.isUpdate = true;
                        this.directService.updateMessage = mes;
                        this.directService.defaultUpdateMessage = mes.body;
                        this.updateMessageId = mes.id;
                        this.popoverController.dismiss();
                        this.updateSubscription.unsubscribe();
                    }
                );
            }
        ));

    }

    private subscribeToNextApiPageUpdate(): void {
        this.directService.hasNextApiPage.subscribe(hasNext => {
            this.infiniteScroll.disabled = !hasNext;
        });
    }

    private scrollToBottom(force: boolean = false): void {
        if (
            this.bottom && !force &&
            !(this.bottom.nativeElement.getBoundingClientRect().top >= 0 &&
                this.bottom.nativeElement.getBoundingClientRect().top <= this.platform.height())
        ) {
            return;
        }
        setTimeout(() => this.content.scrollToBottom(), 50);
    }
}
