import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Service } from '@app/api/models';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ServiceLinkComponent } from './service-link.component';

describe('ServiceLinkComponent', () => {
  let component: ServiceLinkComponent;
  let fixture: ComponentFixture<ServiceLinkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceLinkComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceLinkComponent);
      component = fixture.componentInstance;
      component.service = {} as Service;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
