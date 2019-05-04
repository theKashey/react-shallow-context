<div align="center">
  <h1>React Shallow Context</h1>
  <br/>
  Pure shallow equal for update propagation in 300b.
  <br/>
    
  <a href="https://www.npmjs.com/package/react-shallow-context">
   <img src="https://img.shields.io/npm/v/react-shallow-context.svg?style=flat-square" />
  </a>
  
  <a href="https://codecov.io/github/thekashey/react-shallow-context">
   <img src="https://img.shields.io/codecov/c/github/thekashey/react-shallow-context.svg?style=flat-square)" />
  </a>
  
  <a href="https://travis-ci.org/theKashey/react-shallow-context">
   <img src="https://travis-ci.org/theKashey/react-shallow-context.svg?branch=master" />
  </a>

  <br/>  
</div>  

# Goal
This package optimizes React.Context API by implementing `calculateChangedBits`, which works the same way as
`shouldComponentUpdate` or `PureComponent` - it optimizes the way React reacts to context updates.

# The problem
It is common to store an object inside of the context `Provider`:
```js
<Provider value={{key1: 1, key2: 2}} />
```
However, that produces a new `value` every time, causing all `Consumers` to update. React then needs to traverse
the entire tree to find those `Consumer` components.
This package provides a way to handle when the value changes, and suppress unnecessary updates.

# API

## createPureContext(defaultValue)
Creates "pure" context, the same way that "PureComponent" is "pure." This is equivalent to `React.createContext(xx, pureContextCompare)`
```js
👎 import {createContext} from 'react';
const context = createContext();

👍 import {createPureContext} from 'react-shallow-context';
const context = createPureContext();
```

## pureContextCompare
Shallow compares the old and next context value. It supresses the update if they are the same.
```js
import {pureContextCompare} from 'react-shallow-context';
const context = React.createContext({}, pureContextCompare);

// equal to
const context = createPureContext({});
``` 

## updateIgnoring(keys)
The same as `pureContextCompare`, but it ignores selected keys. This is useful when the context contains some `callback` function that could always be different, 
but only plays a role when another value is changed. 
```js
import {updateIgnoring} from 'react-shallow-context';
const context = React.createContext({importantValue, notImportantValue}, updateIgnoring(['notImportantValue']));
```

## updateOnlyFor(keys)
The inverse of `updateIgnoring`.  Will only trigger an update when the given `keys` change.
```js
import {updateOnlyFor} from 'react-shallow-context';
const context = React.createContext({importantValue, notImportantValue}, updateOnlyFor(['importantValue']));
```

# Licence
 MIT
 
 
