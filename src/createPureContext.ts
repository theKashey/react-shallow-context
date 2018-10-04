import * as React from 'React';
import {pureContextCompare} from "./pure";

export function createPureContext<T>(defaultValue: T): React.Context<T> {
  return React.createContext(defaultValue, pureContextCompare)
}