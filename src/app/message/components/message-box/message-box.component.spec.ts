import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {ApiListResponseFixture} from '../../../../testing/fixtures/api-list-response-fixture';
import {MessageFixture} from '../../../../testing/fixtures/message-fixture';
import {ApiClientService} from '../../../core/services/api-client.service';
import {AbstractMessageService} from '../../abstract/abstract-message.service';
import {MessageInterface} from '../../interfaces/message-interface';
import {InboxMessageService} from '../../services/inbox-message.service';
import {MessageInstanceListComponent} from '../message-instance/message-instance-list.component';
import {MessageBoxComponent} from './message-box.component';


describe('MessageBoxComponent', () => {
    let component: MessageBoxComponent;
    let fixture: ComponentFixture<MessageBoxComponent>;
    let inboxMessageService: AbstractMessageService;
    let message0: MessageInterface;
    let message1: MessageInterface;
    let messages: MessageInterface[] = [];
    let apiClient: ApiClientService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageBoxComponent, MessageInstanceListComponent],
            imports: [
                IonicModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageBoxComponent);
        component = fixture.componentInstance;
        inboxMessageService = fixture.debugElement.injector.get(AbstractMessageService);
        apiClient = TestBed.inject(ApiClientService);
    }));

    beforeEach(() => {
        message0 = getMessageFixture(0);
        message1 = getMessageFixture(1);
        messages = [message0, message1];
        const apiList = ApiListResponseFixture.create(messages);

        spyOn(apiClient, 'get').and.returnValue(of(apiList));
        spyOn(inboxMessageService, 'getMessages').and.callThrough();
        fixture.detectChanges();
        expect(apiClient.get).toHaveBeenCalled();
        expect(inboxMessageService.getMessages).toHaveBeenCalled();
    });

    it('should create messages', () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.directive(MessageInstanceListComponent)).length).toEqual(messages.length);
    });

    it('should delete message', () => {
        spyOn(apiClient, 'delete').and.returnValue(of(null));
        component.deleteMessage(message0.id);
        fixture.detectChanges();
        expect(apiClient.delete).toHaveBeenCalled();
        expect(fixture.debugElement.queryAll(By.directive(MessageInstanceListComponent)).length).toEqual(messages.length - 1);
        expect(component.messages.length).toEqual(messages.length - 1);
    });

});

const getMessageFixture = (id: number): MessageInterface => {
    return MessageFixture.create(id);
};
