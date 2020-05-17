import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookmarksTabComponent } from './bookmarks-tab.component';
import {BookmarksService} from '../../services/bookmarks.service';
import {SavedProfessionalApiService} from '../../services/saved-professional-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BookmarksTabComponent', () => {
  let component: BookmarksTabComponent;
  let fixture: ComponentFixture<BookmarksTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksTabComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [BookmarksService, SavedProfessionalApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
