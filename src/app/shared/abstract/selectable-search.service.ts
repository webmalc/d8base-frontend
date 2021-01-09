import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ReadonlyApiServiceInterface } from '@app/core/interfaces/readonly-api-service-interface';
import { LocationTypes } from '@app/core/types/location-types';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';

export abstract class SelectableSearchService {

    private searchSubscription: Subscription = null;

    public abstractOnSearch<T>(
        component: IonicSelectableComponent,
        text: string,
        apiService: ReadonlyApiServiceInterface<LocationTypes>,
        apiParams: { [param: string]: string | string[]; },
    ): void {
        component.startSearch();

        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }

        if (3 > text.length) {
            if (!text) {
                component.items = [];
            }
            component.endSearch();

            return;
        }

        this.searchSubscription = apiService.get(apiParams).subscribe(
            (data: ApiListResponseInterface<LocationTypes>) => {
                if (this.searchSubscription.closed) {
                    return;
                }

                component.items = data.results;
                component.endSearch();
            },
        );
    }
}
