import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ContactsTabComponent} from '@app/shared/components/contacts-tab/contacts-tab.component';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {LocationComponent} from '@app/shared/components/location/location.component';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {UserLocationMapComponent} from '@app/shared/components/user-location-map/user-location-map.component';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {DebounceDirective} from './directives/debounce.directive';

@NgModule({
    declarations: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        LocationComponent,
        UserLocationMapComponent
    ],
    exports: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        LocationComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        IonicModule,
        ReactiveFormsModule,
        IonicSelectableModule,
        LeafletModule
    ],
    providers: [
        MainGuard,
        TokenManagerService,
        ContactsTabFormService
    ]
})
export class SharedModule {
}
