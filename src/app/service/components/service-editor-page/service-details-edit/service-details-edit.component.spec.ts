import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

import { ServiceDetailsEditComponent } from './service-details-edit.component';

describe('ServiceDetailsEditComponent', () => {
  let component: ServiceDetailsEditComponent;
  let fixture: ComponentFixture<ServiceDetailsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailsEditComponent ],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
      providers: [ServiceEditorDepsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
