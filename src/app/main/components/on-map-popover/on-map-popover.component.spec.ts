import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicModule, NavParams } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnMapPopoverComponent } from './on-map-popover.component';

describe('OnMapPopoverComponent', () => {
  let component: OnMapPopoverComponent;
  let fixture: ComponentFixture<OnMapPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OnMapPopoverComponent],
        imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [
          SelectableCountryOnSearchService,
          SelectableCityOnSearchService,
          { provide: NavParams, useValue: { get: () => null } },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(OnMapPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
