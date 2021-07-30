import { HttpErrorResponse } from '@angular/common/http';

export function getErrorListFromHttpErrorResponse(errorList: { [param: string]: string[] | string }): string[] {
  const result: string[] = [];
  for (const errorListElement in errorList) {
    if (errorList.hasOwnProperty(errorListElement)) {
      if (Array.isArray(errorList[errorListElement])) {
        result.push(...errorList[errorListElement]);
      }
      if (typeof errorList[errorListElement] === 'string' || errorList[errorListElement] instanceof String) {
        result.push(errorList[errorListElement] as string);
      }
    }
  }

  return result;
}

// TODO there can be only one
export function getHttpErrorMessages(response: HttpErrorResponse): string[] {
  const error = response.error;
  const all = error.error?.__all__ || error.__all__;
  return Array.isArray(all)
    ? all
    : Array.isArray(error.password)
    ? error.password
    : error.error_description
    ? [error.error_description]
    : Object.entries(error).map(e => `${e[0]}: ${e[1]}`);
}
