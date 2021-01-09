import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { SentMessage } from '@app/message/models/sent-message';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable()
export class MessagesSentApiService extends AbstractApiService<SentMessage> {

  private readonly url = environment.backend.messages_sent;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public deleteById(id: number): Observable<void> {
    return this.client.delete(`${this.getUrl() + id}/`);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: SentMessage | SentMessage[]): SentMessage | SentMessage[] {
    return plainToClass(SentMessage, data);
  }
}
