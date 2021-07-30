/*
 * Mutates an object, deletes all properties which are `null` or `undefined`
 * TODO should return a new object instead, don't ever use `delete`
 */
export function removeNullProperties<T>(obj: T): T {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }

  return obj;
}
