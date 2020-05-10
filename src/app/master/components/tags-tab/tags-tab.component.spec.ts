import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagsTabComponent } from './tags-tab.component';

describe('TagsTabComponent', () => {
  let component: TagsTabComponent;
  let fixture: ComponentFixture<TagsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsTabComponent ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TagsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
