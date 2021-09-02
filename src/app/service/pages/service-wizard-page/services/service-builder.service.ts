import { Injectable } from '@angular/core';
import { ProfessionalList, Service, ServiceLocation, ServicePhoto, ServiceTag } from '@app/api/models';
import { fileToBase64 } from '@app/core/functions/media.functions';
import { StorageManagerService } from '@app/core/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AggregatedState, StepState } from '../interfaces/steps-state.type';

const storageKey = 'serviceWizardStorageKey';
const defaultState: AggregatedState = {};

@Injectable()
export class ServiceBuilderService {
  public state$: Observable<AggregatedState>;
  public readonly isStateEmpty$: Observable<boolean>;

  private readonly _state$ = new BehaviorSubject<AggregatedState>(defaultState);

  constructor(private readonly storage: StorageManagerService, private readonly store: Store) {
    this.state$ = this._state$.asObservable();
    this.isStateEmpty$ = this.state$.pipe(map(state => !state || Object.values(state).every(v => !v)));
  }

  public async init(): Promise<AggregatedState> {
    const storedState: AggregatedState = await this.storage.get(storageKey);
    const state = {
      ...(storedState ?? {}),
    };
    this._state$.next(state);
    return state;
  }

  public async addData(data: StepState): Promise<void> {
    const newState: AggregatedState = {
      ...this._state$.value,
      ...data,
    };
    this._state$.next(newState);
    await this.storage.set(storageKey, newState);
  }

  public async build(): Promise<{
    service: Service;
    photos: ServicePhoto[];
    locations: ServiceLocation[];
    tags: ServiceTag[];
  }> {
    const professional: ProfessionalList = this.store.selectSnapshot(CurrentUserSelectors.defaultProfessional);
    const state = this._state$.value;
    const service = {
      description: state.description,
      duration: state.duration,
      is_auto_order_confirmation: state.is_auto_order_confirmation,
      is_base_schedule: state.is_base_schedule,
      is_enabled: state.is_enabled,
      name: state.name,
      price: {
        ...state.price,
        payment_methods: state.payment_methods,
      },
      professional: professional.id,
      service_type: state.service_type,
    };
    const photos$ = state.photos.map(async p => ({ photo: await fileToBase64(p), service: NaN }));
    const photos: ServicePhoto[] = await Promise.all(photos$);
    const locations = state.location ? [state.location] : [];
    const tags = state.tags;
    return { service, photos, locations, tags };
  }

  public async clear(): Promise<void> {
    await this.storage.remove(storageKey);
    this._state$.next(defaultState);
  }
}
