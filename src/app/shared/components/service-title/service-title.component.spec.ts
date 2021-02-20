import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ServiceTitleComponent } from './service-title.component';

describe('ServiceTitleComponent', () => {
  let component: ServiceTitleComponent;
  let fixture: ComponentFixture<ServiceTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTitleComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
