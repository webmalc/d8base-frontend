import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { removeNullProperties } from '@app/core/functions/object.functions';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class AbstractApiService<T extends { id: number }>
  extends AbstractReadonlyApiService<T>
  implements ApiServiceInterface<T> {
  protected constructor(protected client: ApiClientService) {
    super(client);
  }

  public create(data: Partial<T>): Observable<T> {
    return this.client
      .post<T, Partial<T>>(this.getUrl(), removeNullProperties(data))
      .pipe(map(raw => this.transform(raw)));
  }

  public patch(data: T, key?: string | number): Observable<T> {
    return this.client
      .patch<T>(`${this.getUrl() + (key ? key : data.id)}/`, removeNullProperties(data))
      .pipe(map(raw => this.transform(raw)));
  }

  public put(data: T): Observable<T> {
    return this.client
      .put<T>(`${this.getUrl()}${data.id}/`, removeNullProperties(data))
      .pipe(map(raw => this.transform(raw)));
  }

  public delete(data: T): Observable<any> {
    return this.client.delete(`${this.getUrl() + data.id}/`);
  }

  public createList(data: T[]): Observable<T[]> {
    return this.client.createList<T>(data, this.getUrl()).pipe(map(raw => this.transform(raw)));
  }

  public patchList(data: T[]): Observable<T[]> {
    return this.client.patchList<T>(data, this.getUrl()).pipe(map(raw => this.transform(raw)));
  }

  public putList(data: T[]): Observable<T[]> {
    return this.client.putList<T>(data, this.getUrl()).pipe(map(raw => this.transform(raw)));
  }

  public deleteList(data: { id?: number }[]): Observable<any> {
    return this.client.deleteList(
      data.map(x => x.id),
      this.getUrl(),
    );
  }
}
