import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryIconWrapperComponent } from './category-icon-wrapper.component';

describe('MainPageIconComponent', () => {
  let component: CategoryIconWrapperComponent;
  let fixture: ComponentFixture<CategoryIconWrapperComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CategoryIconWrapperComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(CategoryIconWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
