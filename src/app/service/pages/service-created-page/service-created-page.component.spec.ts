import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServicePageModule } from '@app/service/service.module';

import { ServiceCreatedPageComponent } from './service-created-page.component';

describe('ServiceSuccessfullyCreatedPageComponent', () => {
  let component: ServiceCreatedPageComponent;
  let fixture: ComponentFixture<ServiceCreatedPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, ServicePageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceCreatedPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
