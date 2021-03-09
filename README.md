[<img src="https://raw.githubusercontent.com/Yoonit-Labs/nativescript-yoonit-camera/development/logo_cyberlabs.png" width="300">](https://cyberlabs.ai/)

# Yoonit Utils

![Version]
![Downloads]
![MIT license](https://img.shields.io/npm/l/@yoonit/nativescript-camera?color=lightgrey&style=for-the-badge)

A Javascript Lib that provides:
- A GraphQl Query Builder
- A GraphQl Mutation Builder

## Table Of Contents

* [Installation](#installation)
* [Usage](#usage)
    * [Query Builder](#query-builder)
    * [Mutation Builder](#mutation-builder)
* [Advanced Usage](#advanced-usage)
* [Using for real](#using-it-for-real)
* [Contribute](#to-contribute-and-make-it-better)

## Installation

```javascript
npm i -s @yoonit/utils
```

## Usage
We used a functional technique called currying at the main constructor function, this means that we pass a subset of arguments and each function returns a function that uses the next subset of arguments.

The first parameters is a string and its the the endpoint name (such as 'getUsers'), it returns the function that uses the next parameter, the arguments object. This function will build the arguments body for your query/mutation and will return another function. This third function uses the third parameter you need to pass, the expected response fields. This will build the response filds and will return you query/mutation ready to use.
You can use the builders without a arguments object, but you need to pass the endpoint name and the response fields, otherwise it will return false and a warning.

Parameters: 
- Endpoint Name e.g., 'getUsers'
- Object parameters e.g., '{ value: 'value' }'
- Expected response fields e.g, 'status', 'message'


### Query Builder

```javascript
import { query } from '@yoonit/utils'

const query = query('getUsers')({ value: 'value', valueTwo: 123 })('status', 'message', 'messageTwo')

console.log(query)
```
Output
```
query {
  getUsers (
    value: "value",
    valueTwo: 123,
  ){
    status,
    message,
    messageTwo
  }
}
```

### Mutation Builder

```javascript
import { mutation } from '@yoonit/utils'

const mutation = mutation('createUser')(name: 'Mutation', surname: 'Builder')('status', 'message')
```
Output
```
mutation {
  createUser (
    name: "Mutation",
    surname: "Builder"
  ){
    status,
    message
  }
}
```

## Advanced Usage

Our builders also suports nested response fields and arrays on arguments object, see beelow how to use it:

```javascript
import { mutation } from '@yoonit/utils'

const mutation = mutation('createUser')({ value: ['value', '123', 'John Doe']})('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test' }, { 'messageAtt': ['att1', 'att2'] }]})

console.log(mutation)
```

Output
```
mutation {
  createUser (
    value: [
      'value',
      '123',
      'John Doe'
    ],
  ){
    status,
    message,
    messageTwo {
      messageTitle,
      messageBody,
      messageAlt {
        test
      },
      messageAtt {
        att1,
        att2
      }
    }
  }
}
```

## Using it for real
You can use it with js fetch or any other HTTP client you like.
See below how to use it with Fetch

```javascript
import { mutation } from '@yoonit/utils'

const body = mutation('createUser')({value: ['value', '123', 'John Doe'] })('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test' }, { 'messageAtt': ['att1', 'att2'] }]})

fetch('http://yourapi:5000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body // Use the builder response here, as your body :) 
  }),
})
```


## To contribute and make it better

Clone the repo, change what you want and send PR.

Contributions are always welcome!

[<img src="https://contrib.rocks/image?repo=Yoonit-Labs/graph-yoonit-ql"/>](https://github.com/Yoonit-Labs/graph-yoonit-ql/graphs/contributors)

---

Code with ❤ by the [**Cyberlabs AI**](https://cyberlabs.ai/) Front-End Team