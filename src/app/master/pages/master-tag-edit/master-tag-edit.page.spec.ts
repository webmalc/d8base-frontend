import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { TagsSelectInputComponent } from '../../components/tags-select-input/tags-select-input.component';
import { MasterTagEditPage } from './master-tag-edit.page';

xdescribe('MasterTagEditPage', () => {
  let component: MasterTagEditPage;
  let fixture: ComponentFixture<MasterTagEditPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterTagEditPage, TagsSelectInputComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterTagEditPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
