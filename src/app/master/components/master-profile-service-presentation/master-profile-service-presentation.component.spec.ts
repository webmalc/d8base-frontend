import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServiceList } from '@app/api/models';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { MasterProfileServicePresentationComponent } from './master-profile-service-presentation.component';

describe('MasterProfileServicePresentationComponent', () => {
  let component: MasterProfileServicePresentationComponent;
  let fixture: ComponentFixture<MasterProfileServicePresentationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileServicePresentationComponent],
        imports: [RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterProfileServicePresentationComponent);
      component = fixture.componentInstance;
      const service: ServiceList = {
        professional: 1,
        service_type: 'client',
        duration: 1,
        name: 'service',
        price: {
          is_price_fixed: true,
          price: '100',
          payment_methods: ['online'],
          service: 1,
        },
      };
      component.serviceData = { service };
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
