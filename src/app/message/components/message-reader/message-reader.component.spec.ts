import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageReaderComponent } from './message-reader.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageInboxResolver} from '../../resolvers/message-inbox.resolver';

describe('MessageReaderComponent', () => {
  let component: MessageReaderComponent;
  let fixture: ComponentFixture<MessageReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageReaderComponent ],
      imports: [IonicModule, RouterTestingModule],
      providers: [MessageInboxResolver]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageReaderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('some tests');

});
