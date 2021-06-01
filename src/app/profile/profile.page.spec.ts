import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { MasterManagerService } from '@app/core/services';
import { Actions } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from '../../testing/mocks';
import { ProfilePage } from './profile.page';

class MasterManagerServiceStub {
  public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let masterService;

  beforeEach(
    waitForAsync(() => {
      masterService = jasmine.createSpyObj('MasterManagerService', ['isMaster']);
      TestBed.configureTestingModule({
        declarations: [ProfilePage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          Actions,
          {
            provide: MasterManagerService,
            useClass: MasterManagerServiceStub,
          },
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfilePage);
      component = fixture.componentInstance;
      masterService = TestBed.inject(MasterManagerService);
    }),
  );
  it('should create', () => {
    expect(component).toBeDefined();
  });
});
