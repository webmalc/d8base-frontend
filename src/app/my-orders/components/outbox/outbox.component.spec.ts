import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { OutboxComponent } from './outbox.component';

describe('OutboxComponent', () => {
  let component: OutboxComponent;
  let fixture: ComponentFixture<OutboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OutboxComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
