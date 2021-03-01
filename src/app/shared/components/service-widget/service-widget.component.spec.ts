import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServiceList } from '@app/api/models';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServiceWidgetComponent } from './service-widget.component';


describe('ServiceWidgetComponent', () => {
  let component: ServiceWidgetComponent;
  let fixture: ComponentFixture<ServiceWidgetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceWidgetComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceWidgetComponent);
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
      component = fixture.componentInstance;
      component.service = service;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
