import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChipComponent } from './chip.component';

describe('FilterChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChipComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ChipComponent);
      component = fixture.componentInstance;
      component.filter = {};
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
