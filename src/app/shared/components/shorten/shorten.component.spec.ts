import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortenPipe } from 'ngx-pipes';
import { ComponentTestingModule, RootModules } from '../../../../testing/component-testing.module';
import { ShortenComponent } from './shorten.component';

describe('ShortenComponent', () => {
  let component: ShortenComponent;
  let fixture: ComponentFixture<ShortenComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShortenComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [ShortenPipe],
      }).compileComponents();

      fixture = TestBed.createComponent(ShortenComponent);
      component = fixture.componentInstance;
      component.text = 'test';
      component.max = 3;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
