import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {ContextMenuPopoverComponent} from '@app/message/components/context-menu-popover/context-menu-popover.component';
import {Message} from '@app/message/models/message';
import {DirectServiceService} from '@app/message/services/direct-service.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {IonContent, IonInfiniteScroll, Platform, PopoverController} from '@ionic/angular';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectComponent extends Reinitable implements OnDestroy {

    @ViewChild(IonInfiniteScroll) public infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent, {read: IonContent, static: false}) public content: IonContent;
    @ViewChild('bottomPoint', {read: ElementRef}) public bottom: ElementRef<HTMLElement>;
    @ViewChild('sentMenu', {read: ElementRef}) public sentMenu: ElementRef<HTMLElement>;
    public showContextIndex;
    public isUpdate: boolean = false;
    private updateMessageId: number;

    constructor(
        private route: ActivatedRoute,
        public directService: DirectServiceService,
        private platform: Platform,
        private popoverController: PopoverController
    ) {
        super();
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
        this.directService.destroy();
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
                ContextMenuPopoverComponent.delete$.pipe(filter(mes => mes !== null)).subscribe(
                    (mes: Message) => {
                        this.directService.delete(mes).subscribe();
                        this.popoverController.dismiss();
                    }
                );
                ContextMenuPopoverComponent.update$.pipe(filter(mes => mes !== null)).subscribe(
                    (mes: Message) => {
                        this.isUpdate = true;
                        this.directService.setMessageText(mes.body);
                        this.updateMessageId = mes.id;
                        this.popoverController.dismiss();
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
