import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterChipComponent } from './filter-chip.component';

describe('FilterChipComponent', () => {
  let component: FilterChipComponent;
  let fixture: ComponentFixture<FilterChipComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FilterChipComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(FilterChipComponent);
      component = fixture.componentInstance;
      component.filter = {};
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
