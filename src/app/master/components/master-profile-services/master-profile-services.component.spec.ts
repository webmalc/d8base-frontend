import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/services';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { MasterProfileServicesComponent } from './master-profile-services.component';

describe('MasterProfileServicesComponent', () => {
  let component: MasterProfileServicesComponent;
  let fixture: ComponentFixture<MasterProfileServicesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileServicesComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          ServicesGeneratorFactoryService,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get(): string {
                    return '';
                  },
                },
              },
            },
          },
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterProfileServicesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
