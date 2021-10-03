<h1 align="center">Yoonit Utils</h1>

<p align="center">
	<img src="https://img.shields.io/npm/v/@yoonit/utils?color=lightgrey&style=for-the-badge&logo=npm"/>
	<img src="https://img.shields.io/npm/dm/@yoonit/utils?color=lightgrey&logo=npm&style=for-the-badge"/>
	<img src="https://img.shields.io/badge/Javascript-35495E?color=lightgrey&style=for-the-badge&logo=javascript"/>
	<img src="https://img.shields.io/npm/l/@yoonit/utils?color=lightgrey&style=for-the-badge"/>
</p>

#### Couple of functions in JS to speed up development and give some help with:
- A GraphQl Query Builder
- A GraphQl Mutation Builder

<div align="center">
	<h3>Sponsors</h3>
	<table>
		<tbody>
			<tr>
				<td>
					<b>Platinum</b>
				</td>
			</tr>
			<tr>
				<td align="center" valign="middle">
					<a href="https://cyberlabs.ai"><img src="https://raw.githubusercontent.com/Yoonit-Labs/javascript-yoonit-utils/development/sponsor_cyberlabs.png" width="300" /></a>
				</td>
			</tr>
		</tbody>
	</table>
	<h5><a href="mailto:about@yoonit.dev">Become a sponsor!</a></h5>
</div>

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
import { graphql } from '@yoonit/utils'

const query = graphql.query('getUsers')({ value: 'value', valueTwo: 123 })('status', 'message', 'messageTwo')
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
import { graphql } from '@yoonit/utils'

const mutation = graphql.mutation('createUser')(name: 'Mutation', surname: 'Builder')('status', 'message')
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
import { graphql } from '@yoonit/utils'

const mutation = graphql.mutation('createUser')({ value: ['value', '123', 'John Doe']})('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test' }, { 'messageAtt': ['att1', 'att2'] }]})
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
import { graphql } from '@yoonit/utils'

const body = graphql.mutation('createUser')({value: ['value', '123', 'John Doe'] })('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test' }, { 'messageAtt': ['att1', 'att2'] }]})

fetch('http://yourapi:5000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body // Use the builder response here, as your body :) 
  })
})
```


## To contribute and make it better

Clone the repo, change what you want and send PR.
For commit messages we use <a href="https://www.conventionalcommits.org/">Conventional Commits</a>.

Contributions are always welcome!

[<img src="https://contrib.rocks/image?repo=Yoonit-Labs/javascript-yoonit-utils"/>](https://github.com/Yoonit-Labs/javascript-yoonit-utils/graphs/contributors)

---

Code with ❤ by the [**Yoonit**](https://yoonit.dev/) Team
