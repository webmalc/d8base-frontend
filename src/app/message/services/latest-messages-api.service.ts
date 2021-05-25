import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api-client.service';
import { LatestMessageInterface } from '@app/message/interfaces/latest-message-interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LatestMessagesApiService {
  private readonly url = environment.backend.latest_messages;

  constructor(protected client: ApiClientService) {}

  public get(): Observable<LatestMessageInterface[]> {
    return this.client.get<LatestMessageInterface[]>(this.url);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: LatestMessageInterface[]): LatestMessageInterface[] {
    return data;
  }
}
