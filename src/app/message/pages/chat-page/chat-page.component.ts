import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { getNoAvatarLink } from '@app/core/functions/file.functions';
import { NgDestroyService } from '@app/core/services';
import { Interlocutor } from '@app/message/interfaces/interlocutor.interface';
import { IonContent, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize, first, map, takeUntil } from 'rxjs/operators';
import { ChatItem } from './chat-item.interface';

import { ContextMenuPopoverComponent } from './context-menu-popover/context-menu-popover.component';
import { ChatService } from './chat.service';
import { MessageAction } from './message-action.interface';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [ChatService, NgDestroyService],
})
export class ChatPageComponent implements AfterViewInit {
  @ViewChild('content', { static: false }) public ionContent: IonContent;
  @ViewChildren('item') public itemElements: QueryList<any>;

  public formControl = new FormControl('', Validators.required);
  public editingMode: boolean = false;
  public interlocutorData$: Observable<Interlocutor>;
  public chat$: Observable<ChatItem[]>;

  private editedMessageId: number;

  constructor(
    private readonly chatService: ChatService,
    private readonly popoverController: PopoverController,
    private readonly ngDestroy$: NgDestroyService,
    route: ActivatedRoute,
  ) {
    this.chat$ = this.chatService.chat$;
    this.interlocutorData$ = this.chatService.interlocutor$;
    this.subscribeToRouteParams(route.paramMap);
  }

  public ngAfterViewInit(): void {
    this.itemElements?.changes.pipe(takeUntil(this.ngDestroy$)).subscribe(() => this.ionContent.scrollToBottom());
  }

  public async showContextMenu(event: MouseEvent, chatItem: ChatItem): Promise<void> {
    event.preventDefault();
    await this.showActionsPopover(chatItem, event);
  }

  public send(): void {
    const value = this.formControl.value;
    this.formControl.disable();
    this.interlocutorData$
      .pipe(
        first(),
        finalize(() => this.formControl.enable()),
      )
      .subscribe(data => {
        this.editingMode
          ? this.chatService.edit(data.id, this.editedMessageId, value)
          : this.chatService.send(data.id, value);
        this.resetInput();
      });
  }

  public resetInput(): void {
    this.editingMode = false;
    this.editedMessageId = undefined;
    this.formControl.reset();
  }

  public getAvatar(interlocutor: Interlocutor): string {
    return interlocutor.avatar_thumbnail ?? getNoAvatarLink();
  }

  public getTrackById(index: number, item: ChatItem): string {
    return item.trackById;
  }

  private async showActionsPopover(message: ChatItem, event: MouseEvent): Promise<void> {
    const pop = await this.popoverController.create({
      component: ContextMenuPopoverComponent,
      translucent: true,
      componentProps: { message },
      animated: true,
      event,
    });
    await pop.present();
    const eventDetail = await pop.onDidDismiss();
    const action: MessageAction = eventDetail.data;
    await this.doContextAction(action);
    await this.popoverController.dismiss();
  }

  private subscribeToRouteParams(paramMap$: Observable<ParamMap>): void {
    const interlocutorId$ = paramMap$.pipe(map(paramMap => Number.parseInt(paramMap.get('interlocutor-id'), 10)));
    interlocutorId$.pipe(takeUntil(this.ngDestroy$)).subscribe(interlocutorId => {
      this.chatService.setInterlocutorId(interlocutorId);
    });
  }

  private async doContextAction(action: MessageAction): Promise<void> {
    if (!action) {
      return;
    }
    if (action.actionType === 'edit') {
      this.editingMode = true;
      this.editedMessageId = action.messageId;
      this.formControl.setValue(action.messageBody);
    }
    if (action.actionType === 'delete') {
      this.chatService.delete(action.messageId);
    }
  }
}
