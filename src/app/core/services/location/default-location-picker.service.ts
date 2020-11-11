import {Injectable} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {DefaultLocation} from '@app/core/models/default-location';
import {DefaultLocationCompilerService} from '@app/core/services/location/default-location-compiler.service';
import {DefaultLocationStorageService} from '@app/core/services/location/default-location-storage.service';
import {DefaultLocationPopoverComponent} from '@app/shared/components/default-location-popover/default-location-popover.component';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {filter, first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DefaultLocationPickerService {

    constructor(
        private readonly defaultLocationCompiler: DefaultLocationCompilerService,
        private readonly defaultLocationStorage: DefaultLocationStorageService,
        private readonly popover: PopoverController
    ) {
    }

    @once
    public init(): void {
        this.defaultLocationStorage.getDefaultLocation().then(
            data => {
                if (null === data) {
                    this.getDefaultLocation().pipe(first(), filter(loc => null !== loc)).subscribe(
                        locationData => this.initPopover(locationData)
                    );
                }
            }
        );
    }

    private async initPopover(data: DefaultLocation): Promise<void> {
        const pop = await this.popover.create({
            component: DefaultLocationPopoverComponent,
            translucent: true,
            animated: true,
            componentProps: {data}
        });
        pop.onDidDismiss().then(
            result => this.defaultLocationStorage.setDefaultLocation(result.data ?? data)
        );
        await pop.present();
    }

    private getDefaultLocation(): Observable<DefaultLocation | null> {
        return this.defaultLocationCompiler.getDefaultLocation();
    }
}
