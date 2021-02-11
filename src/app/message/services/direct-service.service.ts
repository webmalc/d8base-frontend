import { Injectable } from '@angular/core';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { Message } from '@app/message/models/message';
import { SentMessage } from '@app/message/models/sent-message';
import { MessageListUpdaterService } from '@app/message/services/message-list-updater.service';
import { MessagesListApiService } from '@app/message/services/messages-list-api.service';
import { MessagesSentApiService } from '@app/message/services/messages-sent-api.service';
import { environment } from '@env/environment';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class DirectServiceService {

  public messagesListUpdated: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  public newMessageSent: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  public messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  public hasNextApiPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentUserId: number;
  public interlocutorId: number;
  public message: string;
  public defaultUpdateMessage: string;
  public updateMessage: Message;
  private messagesSubscription: Subscription;
  private currentMessagesApiPage: number = 1;
  private readonly messagesPerPage: number = environment.message.messages_per_page;

  constructor(
    private readonly userManager: UserManagerService,
    private readonly messageListUpdater: MessageListUpdaterService,
    private readonly messagesListApi: MessagesListApiService,
    private readonly messagesSentApi: MessagesSentApiService,
  ) {
  }

  public init(interlocutorId: number): Observable<void> {
    this.interlocutorId = interlocutorId;

    return forkJoin({
      user: this.userManager.getCurrentUser(),
      list: this.initMessagesList(),
    }).pipe(
      map(({ user }) => {
        this.currentUserId = user.id;
        this.subscribeToMessagesUpdate();
      }),
    );
  }

  public appendNextApiPage(): Observable<void> {
    return this.messageListUpdater.getMessageList(this.interlocutorId, this.currentMessagesApiPage + 1).pipe(
      tap((resp: ApiListResponseInterface<Message>) => this.handleNextApiPage(resp.next)),
      switchMap((resp: ApiListResponseInterface<Message>) => this.extendMessagesList(resp.results)),
      tap(_ => this.messagesListUpdated.next()),
    );
  }

  public destroy(): void {
    this.messagesSubscription.unsubscribe();
    this.messageListUpdater.destroy();
    this.messages$.next([]);
  }

  public clearMessage(): void {
    this.message = null;
    this.defaultUpdateMessage = null;
    this.updateMessage = null;
  }

  public setMessageText(message: string): void {
    this.message = message;
    this.defaultUpdateMessage = message;
  }

  public send(): void {
    if (!this.message) {
      return;
    }
    this.pushNewMessage();
    this.messagesSentApi.create(this.generateSentMessage()).subscribe(
      _ => {
        this.updateMessageList();
        this.clearMessage();
      },
    );
  }

  public delete(message: Message): void {
    const { id } =  message;
    this.messagesSentApi.deleteById(id).subscribe(() => {
      this.messages$.next(this.messages$.value.filter((oldMessage) => oldMessage.id !== id));
    });
  }

  public update(id: number): void {
    this.messagesSentApi.patch(this.generateUpdateSentMessage()).subscribe(
      _ => {
        this.messagesListUpdated.next();
        this.clearMessage();
      },
    );
  }

  private generateUpdateSentMessage(): SentMessage {
    const message = new SentMessage();
    message.id = this.updateMessage.id;
    message.body = this.updateMessage.body;

    return message;
  }

  private extendMessagesList(list: Message[]): Observable<void> {
    return this.messages$.pipe(
      first(),
      map(currentList => this.setList([...(list.reverse()), ...currentList])),
    );
  }

  private subscribeToMessagesUpdate(): void {
    this.messagesSubscription = this.messageListUpdater.receiveUpdates(this.interlocutorId).subscribe(
      (data: ApiListResponseInterface<Message>) => this.isNeedToUpdate(data.results.reverse()).pipe(
        filter(isNeed => isNeed),
      ).subscribe(_ => this.updateMessageList(data.results)),
    );
  }

  private pushNewMessage(): void {
    this.messages$.pipe(
      first(),
    ).subscribe(
      (list: Message[]) => {
        list.push(this.generateNewMessage());
        this.messages$.next(list);
        this.newMessageSent.next();
      },
    );
  }

  private updateMessageList(list?: Message[]): void {
    list ? this.setList(list) : this.messagesListApi.getByInterlocutor(this.interlocutorId, this.messagesPerPage).subscribe(
      listApiResponse => this.setList(listApiResponse.results.reverse()),
    );
  }

  private handleNextApiPage(nextPageResponse: string): void {
    if (!nextPageResponse) {
      this.hasNextApiPage.next(false);

      return;
    }
    const nextPageIndex = parseInt((new URL(`${nextPageResponse  }/`)).searchParams.get('page'), 10);
    if (nextPageIndex) {
      this.hasNextApiPage.next(true);
      this.currentMessagesApiPage = nextPageIndex - 1;
    } else {
      this.hasNextApiPage.next(false);
    }
  }

  private generateSentMessage(): SentMessage {
    const message = new SentMessage();
    message.recipient = this.interlocutorId;
    message.body = this.message.trim();

    return message;
  }

  private generateNewMessage(): Message {
    const mes = new Message();
    mes.is_read = false;
    mes.body = this.message;
    mes.sender = this.currentUserId;
    mes.recipient = this.interlocutorId;

    return mes;
  }

  private initMessagesList(): Observable<any> {
    return this.messageListUpdater.getMessageList(this.interlocutorId).pipe(
      tap((resp: ApiListResponseInterface<Message>) => this.handleNextApiPage(resp.next)),
      tap((resp: ApiListResponseInterface<Message>) => this.messages$.next(resp.results.reverse())),
      tap(_ => this.messagesListUpdated.next()),
    );
  }

  private setList(list: Message[]): void {
    this.messages$.next(list);
    this.messagesListUpdated.next();
  }

  private isNeedToUpdate(newList: Message[]): Observable<boolean> {
    return this.messages$.pipe(
      first(),
      map((currentList: Message[]) => currentList.slice(-this.messagesPerPage)),
      map(
        (currentList: Message[]) => {
          if (newList.length !== currentList.length) {
            return true;
          }
          for (let i = 0; i < newList.length; i += 1) {
            if ((newList[i].body !== currentList[i].body) ||
              (newList[i].is_read !== currentList[i].is_read) ||
              (newList[i].created !== currentList[i].created)
            ) {
              return true;
            }
          }

          return false;
        },
      ),
    );
  }
}
