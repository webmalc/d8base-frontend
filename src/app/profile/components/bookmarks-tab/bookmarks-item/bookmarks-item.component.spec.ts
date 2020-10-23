import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonButton, IonicModule, IonItem} from '@ionic/angular';

import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BookmarkFixture} from '../../../../../testing/fixtures/bookmark-fixture';
import {Autofixture} from '../../../../../testing/fixtures/generator';
import {MasterFixture} from '../../../../../testing/fixtures/master-fixture';
import {SavedProfessionalInterface} from '../../../../core/interfaces/saved-professional.interface';
import {Master} from '../../../../core/models/master';
import {BookmarksItemComponent} from './bookmarks-item.component';


describe('BookmarksItemComponent', () => {
    let component: BookmarksItemComponent;
    let fixture: ComponentFixture<BookmarksItemComponent>;
    let autofixture: Autofixture;
    let bookmark: SavedProfessionalInterface<Master>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookmarksItemComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(BookmarksItemComponent);
        component = fixture.componentInstance;
        autofixture = new Autofixture();

        const template = MasterFixture.create();
        const master: Master = autofixture.create<Master>(template, { id: 'integer' });
        bookmark = BookmarkFixture.create(master);
        component.bookmark = bookmark;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show some data', () => {
        const nameNE: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
        const noteNE: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(nameNE.innerText).toBe(bookmark.professional.name);
        expect(noteNE.innerText).toBe(bookmark.note);
    });

    it('should show button delete or restore depends delete property', () => {
        let buttonDE: DebugElement;
        let ionItem: DebugElement;

        buttonDE = fixture.debugElement.query(By.directive(IonButton));
        expect(buttonDE.nativeElement.textContent).toBe('Remove');
        ionItem = fixture.debugElement.query(By.directive(IonItem));
        expect(ionItem.classes['bm-deleted']).toBeFalsy();

        component.deleted = true;
        fixture.detectChanges();
        buttonDE = fixture.debugElement.query(By.directive(IonButton));
        expect(buttonDE.nativeElement.textContent).toBe('Restore');
        ionItem = fixture.debugElement.query(By.directive(IonItem));
        expect(ionItem.classes['bm-deleted']).toBeTruthy();
    });

    it('should emit id\'s when remove and restore buttons were clicked', () => {
        let removeId: number = null;
        let restoreId: number = null;
        let buttonDE: DebugElement;
        component.removeFromBookmark.subscribe(id => removeId = id);
        component.restoreToBookmark.subscribe(id => restoreId = id);

        buttonDE = fixture.debugElement.query(By.directive(IonButton));
        buttonDE.triggerEventHandler('click', null);
        expect(removeId).toBe(bookmark.id);
        expect(restoreId).toBe(null);

        component.deleted = true;
        fixture.detectChanges();
        buttonDE = fixture.debugElement.query(By.directive(IonButton));
        buttonDE.triggerEventHandler('click', null);
        expect(restoreId).toBe(bookmark.id);
    });
});
