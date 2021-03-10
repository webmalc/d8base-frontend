/* eslint-disable max-classes-per-file */
import { TestBed } from '@angular/core/testing';
import { ReceivedMessage } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { Action, NgxsModule, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationWorkerService } from './notification-worker.service';
import { UnreadMessagesService } from './unread-messages.service';

const mockDeafultState = {
  isAuthenticated: undefined,
};

const mockMessages: { count: number; next?: null | string; previous?: null | string; results: Array<ReceivedMessage> } = {
  count: 2,
  results: [
    {
      id: 45,
      sender: 1,
      parent: null,
      subject: null,
      body: 'Message01',
      is_read: false,
      read_datetime: null,
      created: '2021-03-10T14:06:34.733060+01:00',
      modified: '2021-03-10T14:06:34.733088+01:00',
      created_by: 1,
      modified_by: 1,
    },
    {
      id: 44,
      sender: 6,
      parent: null,
      subject: null,
      body: 'Message02',
      is_read: false,
      read_datetime: null,
      created: '2021-03-10T14:05:35.077438+01:00',
      modified: '2021-03-10T14:05:35.077462+01:00',
      created_by: 6,
      modified_by: 6,
    },
  ],
};

export class Login {
  public static readonly type = 'Login';
}
export class Logout {
  public static readonly type = 'Logout';
}

@State({
  name: 'MockState',
  defaults: mockDeafultState,
})
class MockState {
  @Action(Login)
  public login({ patchState }: StateContext<typeof mockDeafultState>): Observable<any> {
    return of(null).pipe(
      tap(() => {
        patchState({ isAuthenticated: true });
      }),
    );
  }

  @Action(Logout)
  public logout({ patchState }: StateContext<typeof mockDeafultState>): Observable<any> {
    return of(null).pipe(
      tap(() => {
        patchState({ isAuthenticated: false });
      }),
    );
  }
}

class MockStateSelectors {
  @Selector([MockState])
  public static isAuthenticated(data): boolean {
    return data.isAuthenticated;
  }
}

class MockCommunicationService {
  public communicationMessagesReceivedList(): Observable<{
    count: number;
    next?: null | string;
    previous?: null | string;
    results: Array<ReceivedMessage>;
  }> {
    return of({ ...mockMessages });
  }
}

export class MockNotificationWorkerService {
  public messageReceived$: Subject<boolean> = new Subject<boolean>();
}

let worker: NotificationWorkerService;
let communicationService: CommunicationService;
let store: Store;
let service: UnreadMessagesService;
let messagesVar = mockMessages;

describe('UnreadMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockState])],
      providers: [
        UnreadMessagesService,
        {
          provide: CommunicationService,
          useClass: MockCommunicationService,
        },
        {
          provide: NotificationWorkerService,
          useClass: MockNotificationWorkerService,
        },
      ],
    });
    worker = TestBed.inject(NotificationWorkerService);
    communicationService = TestBed.inject(CommunicationService);
    store = TestBed.inject(Store);
    service = TestBed.inject(UnreadMessagesService);
    Object.defineProperty(service, 'isAuthenticated$', { writable: true });
    (service as any).isAuthenticated$ = store.select(MockStateSelectors.isAuthenticated);
    (service as any).isFirebaseSupported = () => false;
    (service as any).initUnreadMessages.call(service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return right value depends on authorized', async done => {
    const authChangedSpy = jasmine.createSpy('authChangedSpy');

    service.unreadMessages().subscribe(messages => {
      authChangedSpy(messages);
      if (messages) {
        // compare by reference - should be different
        expect(messages === messagesVar).toBeFalse();
        messagesVar = messages;
      }
      done();
    });

    expect(authChangedSpy.calls.count()).toEqual(1);
    expect(authChangedSpy).toHaveBeenCalledWith(null);

    store.dispatch(Login);
    expect(authChangedSpy.calls.count()).toEqual(2);
    expect(authChangedSpy).toHaveBeenCalledWith(mockMessages);

    store.dispatch(Logout);
    expect(authChangedSpy.calls.count()).toEqual(3);
    expect(authChangedSpy).toHaveBeenCalledWith(null);

    store.dispatch(Login);
    expect(authChangedSpy.calls.count()).toEqual(4);
    expect(authChangedSpy).toHaveBeenCalledWith(mockMessages);

    store.dispatch(Logout);
    expect(authChangedSpy.calls.count()).toEqual(5);
    expect(authChangedSpy).toHaveBeenCalledWith(null);
  });

  it('should emit messages when notification received', async done => {
    const notificationsReceivedSpy = jasmine.createSpy('notificationsReceivedSpy');

    (service as any).isFirebaseSupported = () => true;
    store.dispatch(Login);

    service.unreadMessages().subscribe(messages => {
      if (messages) {
        expect(messages === messagesVar).toBeFalse();
        messagesVar = messages;
      }
      notificationsReceivedSpy(messages);
      done();
    });

    expect(notificationsReceivedSpy.calls.count()).toEqual(1);
    expect(notificationsReceivedSpy).toHaveBeenCalledWith(mockMessages);

    worker.messageReceived$.next(true);
    expect(notificationsReceivedSpy.calls.count()).toEqual(2);
    expect(notificationsReceivedSpy).toHaveBeenCalledWith(mockMessages);

    worker.messageReceived$.next(true);
    expect(notificationsReceivedSpy.calls.count()).toEqual(3);
    expect(notificationsReceivedSpy).toHaveBeenCalledWith(mockMessages);

    store.dispatch(Logout);
    expect(notificationsReceivedSpy.calls.count()).toEqual(4);
    expect(notificationsReceivedSpy).toHaveBeenCalledWith(null);
  });

  it('should emit messages count', async done => {
    const countReceivedSpy = jasmine.createSpy('countReceivedSpy');

    service.unreadMessagesCount().subscribe(count => {
      countReceivedSpy(count);
      done();
    });

    expect(countReceivedSpy.calls.count()).toEqual(1);
    expect(countReceivedSpy).toHaveBeenCalledWith(undefined);

    store.dispatch(Login);
    expect(countReceivedSpy.calls.count()).toEqual(2);
    expect(countReceivedSpy).toHaveBeenCalledWith(2);

    store.dispatch(Logout);
    expect(countReceivedSpy.calls.count()).toEqual(3);
    expect(countReceivedSpy).toHaveBeenCalledWith(undefined);

    (service as any).isFirebaseSupported = () => true;
    store.dispatch(Login);
    expect(countReceivedSpy.calls.count()).toEqual(4);
    expect(countReceivedSpy).toHaveBeenCalledWith(2);

    worker.messageReceived$.next(true);
    expect(countReceivedSpy.calls.count()).toEqual(5);
    expect(countReceivedSpy).toHaveBeenCalledWith(2);

    mockMessages.count = 3;
    worker.messageReceived$.next(true);
    expect(countReceivedSpy.calls.count()).toEqual(6);
    expect(countReceivedSpy).toHaveBeenCalledWith(3);

    store.dispatch(Logout);
    expect(countReceivedSpy.calls.count()).toEqual(7);
    expect(countReceivedSpy).toHaveBeenCalledWith(undefined);
  });
});
