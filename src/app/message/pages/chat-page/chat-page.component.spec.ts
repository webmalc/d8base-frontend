import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessagePageModule } from '@app/message/message.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ChatPageComponent } from './chat-page.component';

describe('DirectComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChatPageComponent],
        imports: [RootModules(), ComponentTestingModule, MessagePageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ChatPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
