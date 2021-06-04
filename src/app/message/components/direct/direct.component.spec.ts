import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessagePageModule } from '@app/message/message.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { DirectComponent } from './direct.component';

describe('DirectComponent', () => {
  let component: DirectComponent;
  let fixture: ComponentFixture<DirectComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DirectComponent],
        imports: [RootModules(), ComponentTestingModule, MessagePageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(DirectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
