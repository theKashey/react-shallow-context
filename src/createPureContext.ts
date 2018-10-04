import * as React from 'react';
import {pureContextCompare} from "./pure";

export function createPureContext<T>(defaultValue: T): React.Context<T> {
  return React.createContext(defaultValue, pureContextCompare)
}