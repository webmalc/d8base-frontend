import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { MasterApiService } from '@app/master/services/master-api.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { MasterEditPage } from './master-edit.page';

describe('MasterEditPage', () => {
  let component: MasterEditPage;
  let fixture: ComponentFixture<MasterEditPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterEditPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
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
          MasterApiService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterEditPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
