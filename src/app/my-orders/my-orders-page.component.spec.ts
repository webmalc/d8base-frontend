import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from '../../testing/mocks';
import { MyOrdersPageComponent } from './my-orders-page.component';

describe('MyOrdersPageComponent', () => {
  let component: MyOrdersPageComponent;
  let fixture: ComponentFixture<MyOrdersPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MyOrdersPageComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(MyOrdersPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
