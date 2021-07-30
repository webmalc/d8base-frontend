import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { Actions } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { AboutEditComponent } from './about-edit.component';

describe('AboutEditComponent', () => {
  let component: AboutEditComponent;
  let fixture: ComponentFixture<AboutEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AboutEditComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [Actions, FormBuilder, { provide: StorageManagerService, useClass: StorageManagerMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(AboutEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
