import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';
import { CityPickerPopoverComponent } from './city-picker-popover.component';

describe('CityPickerPopoverComponent', () => {
  let component: CityPickerPopoverComponent;
  let fixture: ComponentFixture<CityPickerPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CityPickerPopoverComponent],
        imports: [IonicModule, HttpClientTestingModule],
        providers: [{ provide: NavParams, useValue: { get: () => null } }],
      }).compileComponents();

      fixture = TestBed.createComponent(CityPickerPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
