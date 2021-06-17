import { Injectable } from '@angular/core';
import { Message, SentMessage } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { ChatItem } from '@app/message/components/direct/chat-item.interface';
import { Interlocutor } from '@app/message/components/interlocutor.interface';
import { environment } from '@env/environment';
import { combineLatest, interval, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

function getChatItem(message: Message, senderId: number): ChatItem {
  const type = message.sender === senderId ? 'received' : 'sent';
  const state = message.is_read ? 'read' : 'received';
  return {
    id: `${type}|${message.id}|${state}`,
    messageId: message.id,
    body: message.body,
    type,
    timestamp: new Date(message.created),
    state,
  };
}

function getChatItems(messages: Message[], senderId: number): ChatItem[] {
  return messages.map(m => getChatItem(m, senderId));
}

@Injectable()
export class DirectServiceService {
  private readonly _interlocutor$ = new ReplaySubject<Interlocutor>(1);
  private readonly _fetchMessages$ = new ReplaySubject<void>(1);
  private readonly _chat$: Observable<ChatItem[]>;

  constructor(private readonly api: CommunicationService, private readonly ngDestroy$: NgDestroyService) {
    this._chat$ = combineLatest([this._interlocutor$, this._fetchMessages$]).pipe(
      switchMap(([interlocutor]) =>
        this.api
          .communicationMessagesListList({ interlocutor: interlocutor.id })
          .pipe(map(response => getChatItems(response.results, interlocutor.id).reverse())),
      ),
    );
    this._fetchMessages$.next();
    this.subscribeToNotifications();
  }

  public get chat$(): Observable<ChatItem[]> {
    return this._chat$;
  }

  public get interlocutor$(): Observable<Interlocutor> {
    return this._interlocutor$;
  }

  public setInterlocutorId(interlocutorId: number): void {
    this.api.communicationMessagesLatestList().subscribe((allChats: any[]) => {
      const thisChat = allChats.find(c => c.recipient.id === interlocutorId);
      this._interlocutor$.next(thisChat ? thisChat.recipient : { id: interlocutorId });
    });
  }

  public send(recipient: number, body: string): void {
    const message: SentMessage = {
      recipient,
      body,
    };
    this.api.communicationMessagesSentCreate(message).subscribe(() => this._fetchMessages$.next());
  }

  public delete(messageId: number): void {
    this.api.communicationMessagesSentDelete(messageId).subscribe(() => this._fetchMessages$.next());
  }

  public edit(recipient: number, id: number, newBody: string): void {
    const data: SentMessage = {
      recipient,
      body: newBody,
    };
    this.api.communicationMessagesSentUpdate({ id, data }).subscribe(() => this._fetchMessages$.next());
  }

  private subscribeToNotifications(): void {
    // TODO use notifications service
    interval(environment.message.direct_update_interval_ms)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => this._fetchMessages$.next());
  }
}
