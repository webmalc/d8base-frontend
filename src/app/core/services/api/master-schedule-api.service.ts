import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { MasterSchedule } from '@app/professional/models/master-schedule';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MasterScheduleApiService extends AbstractApiService<Required<Pick<MasterSchedule, 'id'>>> {
  private readonly url = environment.backend.master_schedule;
  private readonly setUrl = environment.backend.master_schedule_set;

  constructor(protected readonly client: ApiClientService) {
    super(client);
  }

  public createSet(data: MasterSchedule[]): Observable<MasterSchedule[]> {
    return this.client
      .post<MasterSchedule[], MasterSchedule[]>(this.setUrl, data)
      .pipe(map(raw => plainToClass(MasterSchedule, raw)));
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: MasterSchedule | MasterSchedule[]): MasterSchedule | MasterSchedule[] {
    return plainToClass(MasterSchedule, data);
  }
}
