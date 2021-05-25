import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IfSpinnerDirective } from './if-spinner.directive';

describe('IfSpinnerDirective', () => {
  let fixture: ComponentFixture<any>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IfSpinnerDirective, TestComponent],
      imports: [CommonModule],
    });
  });

  afterEach(() => {
    fixture = null;
  });

  it(
    'should work in a template attribute',
    waitForAsync(() => {
      const template = '<span *appIfSpinner="booleanCondition">hello</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('hello');
    }),
  );

  it(
    'should work on a template element',
    waitForAsync(() => {
      const template = '<ng-template [appIfSpinner]="booleanCondition">hello2</ng-template>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).toContain('hello2');
    }),
  );

  it(
    'should toggle node when condition changes',
    waitForAsync(() => {
      const template = '<span *appIfSpinner="booleanCondition">hello</span>';
      fixture = createTestComponent(template);
      getComponent().booleanCondition = false;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.innerHTML).toContain('');

      getComponent().booleanCondition = true;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('hello');

      getComponent().booleanCondition = false;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.innerHTML).toContain('');
    }),
  );

  it(
    'should handle nested appIfSpinner correctly',
    waitForAsync(() => {
      const template =
        '<div *appIfSpinner="booleanCondition"><span *appIfSpinner="nestedBooleanCondition">hello</span></div>';

      fixture = createTestComponent(template);

      getComponent().booleanCondition = false;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.innerHTML).toContain('');

      getComponent().booleanCondition = true;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('hello');

      getComponent().nestedBooleanCondition = false;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.innerHTML).toContain('');

      getComponent().nestedBooleanCondition = true;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('hello');

      getComponent().booleanCondition = false;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.innerHTML).toContain('');
    }),
  );

  it(
    'should update several nodes with appIfSpinner',
    waitForAsync(() => {
      const template =
        '<span *appIfSpinner="numberCondition + 1 >= 2">helloNumber</span>' +
        '<span *appIfSpinner="stringCondition == \'foo\'">helloString</span>' +
        '<span *appIfSpinner="functionCondition(stringCondition, numberCondition)">helloFunction</span>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(3);
      expect(fixture.nativeElement.textContent).toEqual('helloNumberhelloStringhelloFunction');

      getComponent().numberCondition = 0;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('helloString');

      getComponent().numberCondition = 1;
      getComponent().stringCondition = 'bar';
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.innerHTML).toContain('helloNumber');
    }),
  );

  it(
    'should not add the element twice if the condition goes from truthy to truthy',
    waitForAsync(() => {
      const template = '<span *appIfSpinner="numberCondition">hello</span>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      let els = fixture.debugElement.queryAll(By.css('span'));
      expect(els.length).toEqual(1);
      els[0].nativeElement.classList.add('marker');
      expect(fixture.nativeElement.innerHTML).toContain('hello');

      getComponent().numberCondition = 2;
      fixture.detectChanges();
      els = fixture.debugElement.queryAll(By.css('span'));
      expect(els.length).toEqual(1);
      expect(els[0].nativeElement.classList.contains('marker')).toBe(true);

      expect(fixture.nativeElement.innerHTML).toContain('hello');
    }),
  );

  describe('spinner component/fallbackTemplate templates', () => {
    it(
      'should support dynamic LoadingIndicatorComponent',
      waitForAsync(() => {
        const template = '<span *appIfSpinner="booleanCondition">hello</span>';

        fixture = createTestComponent(template);

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).not.toContain('hello');
        expect(fixture.debugElement.queryAll(By.css('app-loading-indicator')).length).toEqual(1);
      }),
    );

    it(
      'should support fallbackTemplate',
      waitForAsync(() => {
        const template =
          '<span *appIfSpinner="booleanCondition; fallbackTemplate fallbackBlock">TRUE</span>' +
          '<ng-template #fallbackBlock>FALSE</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('TRUE');

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('FALSE');
      }),
    );

    it(
      'should support binding to variable using let',
      waitForAsync(() => {
        const template =
          '<span *appIfSpinner="booleanCondition; fallbackTemplate fallbackBlock; let v">{{v}}</span>' +
          '<ng-template #fallbackBlock let-v>{{v}}</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('true');

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('false');
      }),
    );

    it(
      'should support binding to variable using as',
      waitForAsync(() => {
        const template =
          '<span *appIfSpinner="booleanCondition as v; fallbackTemplate fallbackBlock">{{v}}</span>' +
          '<ng-template #fallbackBlock let-v>{{v}}</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('true');

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('false');
      }),
    );
  });
});

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  public booleanCondition: boolean = true;
  public nestedBooleanCondition: boolean = true;
  public numberCondition: number = 1;
  public stringCondition: string = 'foo';
  public functionCondition: Function = (s: any, n: any): boolean => s === 'foo' && n === 1;
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, { set: { template } }).createComponent(TestComponent);
}
