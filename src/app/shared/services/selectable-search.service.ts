import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {IonicSelectableComponent} from 'ionic-selectable';
import {Observable, Subscription} from 'rxjs';

export abstract class SelectableSearchService {

    private searchSubscription: Subscription = null;

    public abstractOnSearch<T>(
        component: IonicSelectableComponent,
        text: string,
        apiService: { getList: (params: object) => Observable<ApiListResponseInterface<T>> },
        apiParams: object
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

        this.searchSubscription = apiService.getList(apiParams).subscribe(
            (data: ApiListResponseInterface<T>) => {
                if (this.searchSubscription.closed) {
                    return;
                }

                component.items = data.results;
                component.endSearch();
            }
        );
    }
}
