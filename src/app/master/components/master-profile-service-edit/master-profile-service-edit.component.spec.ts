import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServiceList } from '@app/api/models';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { MasterProfileServiceEditComponent } from './master-profile-service-edit.component';

describe('MasterProfileServiceEditComponent', () => {
  let component: MasterProfileServiceEditComponent;
  let fixture: ComponentFixture<MasterProfileServiceEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileServiceEditComponent],
        imports: [RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterProfileServiceEditComponent);
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
      component.service = service;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
