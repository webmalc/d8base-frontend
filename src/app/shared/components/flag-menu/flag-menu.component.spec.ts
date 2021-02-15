import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { FlagMenuComponent } from './flag-menu.component';

describe('FlagMenuComponent', () => {
  let component: FlagMenuComponent;
  let fixture: ComponentFixture<FlagMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FlagMenuComponent],
      imports: [
        ...ROOT_MODULES,
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
