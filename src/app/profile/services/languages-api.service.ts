import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { Language } from '@app/profile/models/language';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguagesApiService extends AbstractReadonlyApiService<Language> {

  private readonly url = environment.backend.language;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public getLanguages$(): Observable<Language[]> {
    return this.client.get<Language[]>(this.url).pipe(
      map(languages => plainToClass(Language, languages, { excludeExtraneousValues: true })),
    );
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: Language | Language[]): Language | Language[] {
    return plainToClass(Language, data);
  }
}
