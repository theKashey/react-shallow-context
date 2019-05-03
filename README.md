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
This package optimizes React.Context API, implementing `calculateChangedBits`, which works the same way
`shouldComponentUpdate` or just `PureComponent` works - optimizes the way React react to updated

# The problem
It is common to store something inside context Provider. Something like this
```js
<Provider value={{key1: 1, key2: 2}} />
```
That would produce a new `value` every time, causing all `Consumers` to update, and causing React to traverse all
the tree, to find those Consumers.
This package provides a way to handle the value change event, and suppress unnecessary updates.

# API

## createPureContext(defaultValue)
Creates "pure" context, the same "pure" as in "PureComponent". This is basically `React.createContext(xx, pureContextCompare)`
```js
👎 import {createContext} from 'react';
const context = createContext();

👍 import {createPureContext} from 'react-shallow-context';
const context = createPureContext();
```

## pureContextCompare
shallow compares the old and the next context value. Supress update if the are the same.
```js
import {pureContextCompare} from 'react-shallow-context';
const context = React.createContext({}, pureContextCompare);

// equal to
const context = createPureContext({});
``` 

## updateIgnoring(keys)
The same, but ignoring selected keys. Useful then context contain some `callback` function, which could be allways the different, 
but play a role, only when anther value got changed. 
```js
import {updateIgnoring} from 'react-shallow-context';
const context = React.createContext({importantValue, notImportantValue}, updateIgnoring(['notImportantValue']));
```

## updateOnlyFor(keys)
The same, but with inversed logic. 
```js
import {updateOnlyFor} from 'react-shallow-context';
const context = React.createContext({importantValue, notImportantValue}, updateOnlyFor(['importantValue']));
```

# Licence
 MIT
 
 
