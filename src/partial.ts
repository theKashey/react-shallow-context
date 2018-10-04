// @ts-ignore
import * as compareObject from 'shallow-equal/objects';

export type Comparator<T> = (a: T, b: T) => number;

function pick<T>(a: T, keys: Array<keyof T>) {
  const ret: T = {} as any;
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    ret[key] = a[key]
  }
  return ret;
}

function omit<T extends object>(a: T, keys: Array<keyof T>) {
  const ret: T = Object.assign({}, a);
  for (let i = 0; i < keys.length; ++i) {
    delete ret[keys[i]];
  }
  return ret;
}

export function updateOnlyFor<T extends object>(keys: Array<keyof T>): Comparator<T> {
  return (a: T, b: T) => {
    const subA = pick(a, keys);
    const subB = pick(b, keys);
    return compareObject(subA, subB) ? 0 : 1;
  }
}

export function updateIgnoring<T extends object>(keys: Array<keyof T>): Comparator<T> {
  return (a: T, b: T) => {
    const subA = omit(a, keys);
    const subB = omit(b, keys);
    return compareObject(subA, subB) ? 0 : 1;
  }
}