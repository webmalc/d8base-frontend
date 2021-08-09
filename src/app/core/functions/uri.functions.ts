import { HttpParams } from '@angular/common/http';

export function parseUriString(uri: string): { path: string; queryParams?: object } {
  const defaultResult = {
    path: uri,
  };
  if (!uri) {
    return defaultResult;
  }

  if (uri.includes('?')) {
    const split = uri.split('?');
    const path = split[0];
    const httpParams = new HttpParams({ fromString: split[1] });
    const queryParams = httpParams.keys().reduce((o, key) => ({ ...o, [key]: httpParams.get(key) }), {});
    return {
      path,
      queryParams,
    };
  }

  return defaultResult;
}
