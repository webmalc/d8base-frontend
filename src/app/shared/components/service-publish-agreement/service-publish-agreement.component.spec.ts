import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServicePublishAgreementComponent } from './service-publish-agreement.component';

describe('ServicePublishAgreementComponent', () => {
  let component: ServicePublishAgreementComponent;
  let fixture: ComponentFixture<ServicePublishAgreementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePublishAgreementComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
