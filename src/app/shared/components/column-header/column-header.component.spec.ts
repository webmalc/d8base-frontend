import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { ColumnHeaderComponent } from './column-header.component';

describe('ColumnHeaderComponent', () => {
  let component: ColumnHeaderComponent;
  let fixture: ComponentFixture<ColumnHeaderComponent>;
  let location: Location;
  let router: Router;
  const testRoute = 'testRoute';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ColumnHeaderComponent, ContentWrapperComponent],
        imports: [
          ...RootModules(),
          ComponentTestingModule,
        ],
      }).compileComponents();
      location = TestBed.inject(Location);
      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(ColumnHeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleText = 'Title';
    const titleText2 = '02Title02';
    const titleElement = fixture.debugElement.query(By.css('ion-title'));

    component.title = titleText;
    fixture.detectChanges();
    expect(titleElement.nativeElement.textContent).toBe(titleText);

    component.title = titleText2;
    fixture.detectChanges();
    expect(titleElement.nativeElement.textContent).toBe(titleText2);
  });

  it('should navigate to default fallback and location.back', () => {
    const previousLocationFallback = component.previousLocationFallback;

    const navigateSpy = spyOn(router, 'navigateByUrl');
    const locationBackSpy = spyOn(location, 'back');

    const buttonElement = fixture.debugElement.query(By.css('ion-button'));

    buttonElement.nativeElement.click();
    expect(navigateSpy).toHaveBeenCalledWith(previousLocationFallback);

    buttonElement.nativeElement.click();
    expect(locationBackSpy).toHaveBeenCalled();

  });
});
