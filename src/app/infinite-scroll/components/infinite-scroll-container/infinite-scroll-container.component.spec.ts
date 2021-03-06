import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { InfiniteScrollContainerComponent } from './infinite-scroll-container.component';

describe('InfiniteScrollContainerComponent', () => {
  let component: InfiniteScrollContainerComponent<unknown>;
  let fixture: ComponentFixture<InfiniteScrollContainerComponent<unknown>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InfiniteScrollContainerComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(InfiniteScrollContainerComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
