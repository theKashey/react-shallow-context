// @ts-ignore
import * as compareArray from 'shallow-equal/arrays';
// @ts-ignore
import * as compareObject from 'shallow-equal/objects';

export function pureContextCompare<T>(a: T, b: T) {
  if (a === b) {
    return 0;
  }
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) {
    return 1;
  }
  if (typeA === 'string' || typeA === 'number') {
    return 1;
  }
  if (typeA === 'object') {
    if (Array.isArray(a)) {
      return compareArray(a, b) ? 0 : 1;
    }
    return compareObject(a, b) ? 0 : 1;
  }
  return 1;
}