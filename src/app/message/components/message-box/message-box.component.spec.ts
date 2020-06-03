import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {MessageBoxComponent} from './message-box.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageService} from '../../services/message.service';
import {MessageFixture} from '../../../../testing/fixtures/message-fixture';
import {MessageInterface} from '../../interfaces/message-interface';
import {of} from 'rxjs';
import {MessageInstanceComponent} from '../message-instance/message-instance.component';
import {TranslateModule} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';


describe('MessageBoxComponent', () => {
    let component: MessageBoxComponent;
    let fixture: ComponentFixture<MessageBoxComponent>;
    let messageService: MessageService;
    let message0: MessageInterface;
    let message1: MessageInterface;
    let messages: MessageInterface[] = [];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageBoxComponent, MessageInstanceComponent],
            imports: [
                IonicModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageBoxComponent);
        component = fixture.componentInstance;
        messageService = fixture.debugElement.injector.get(MessageService);
    }));

    beforeEach(() => {
        message0 = getMessageFixture(0);
        message1 = getMessageFixture(1);
        messages = [message0, message1];
        spyOn(messageService, 'getMessages').and.returnValue(of(messages));
        fixture.detectChanges();
        expect(messageService.getMessages).toHaveBeenCalled();
    });

    it('should create messages', () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.directive(MessageInstanceComponent)).length).toEqual(messages.length);
    });

    it('should delete message', () => {
        spyOn(messageService, 'removeMessage').and.callFake((id: number) => {
            expect(id).toEqual(message0.id);

            return of(null);
        });
        component.deleteMessage(message0.id);
        fixture.detectChanges();
        expect(messageService.removeMessage).toHaveBeenCalled();
        expect(fixture.debugElement.queryAll(By.directive(MessageInstanceComponent)).length).toEqual(messages.length - 1);
        expect(component.messages.length).toEqual(messages.length - 1);
    });

    xit('should be some add, delete listeners');

});

const getMessageFixture = (id: number): MessageInterface => {
    return MessageFixture.create(id);
};
