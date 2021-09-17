import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppliedFiltersComponent } from './applied-filters.component';

describe('AppliedFiltersComponent', () => {
  let component: AppliedFiltersComponent;
  let fixture: ComponentFixture<AppliedFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppliedFiltersComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(AppliedFiltersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
