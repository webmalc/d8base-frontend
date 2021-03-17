import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SavedProfessionalToggleComponent } from './saved-professional-toggle.component';

describe('SavedProfessionalToggleComponent', () => {
  let component: SavedProfessionalToggleComponent;
  let fixture: ComponentFixture<SavedProfessionalToggleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SavedProfessionalToggleComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(SavedProfessionalToggleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
