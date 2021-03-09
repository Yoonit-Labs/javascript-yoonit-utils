
// this function parses the arrays on mutations arguments so graphql doesnt fuck up
export const parseToGql = args => {
  let newArgs = JSON.stringify(args)
  newArgs = newArgs.replace(/\"([A-z])\w+\"(\:| \:)/g, elm => {
    elm = elm.replace(/\"/g, '')
    return elm
  })
  return newArgs
}

// this function constructs the query/mutation body calling other functions
export const construct = (type, methodName) => {

  return (args) => {
    let argString = buildArgs(args)

    return (...fields) => {
      if (!fields.length) {
        console.warn("You need to specify at least one response field")
        return false 
      }
      let requestedFields = buildRequestedFields(fields)

      return `${type} {
        ${methodName} (
          ${argString}
        ){
          ${requestedFields}
          }
        }`
    }
  }
}

// this is the main mutation function, it calls the construct function and its called by the user
// this.mutation('endpoint')({arguments}, token)(requestedFields)
export const mutation = (mutationName) => {
  if(!mutationName) {
    console.warn("You need to specify an endpoint")
    return () => {
      return () => {
        return false
      }
    }
  }
  return construct.call(this, 'mutation', mutationName)
}

// this is the main query function, it calls the construct function and its called by the user
// this.query('endpoint')({arguments}, token)(requestedFields)
export const query = (queryName) => {
  if(!queryName) {
    console.warn("You need to specify an endpoint")
    return () => {
      return () => {
        return false
      }
    }
  }
  return construct.call(this, 'query', queryName)
}

// this function returns the requested fields string
export const buildRequestedFields = (fields) => {
  return fields.reduce((...args) => reduceFunction(...args))
}

// this function builds the requested fields string
export const reduceFunction = (acc, elm) => {
  if (typeof elm === 'string') {
    acc = `${acc}, ${elm}`
    return acc
  }
  if (elm.constructor === Object) {
    let keys = Object.keys(elm)
    let keyBody = elm[keys[0]]

    if (Array.isArray(keyBody)) {
      const objBody = keyBody.reduce((...args) => reduceFunction(...args))
      acc = `${acc}, ${keys[0]} { ${objBody} }`
      return acc
    }

    acc = `${acc}, ${keys[0]} { ${keyBody} }`
    return acc
  }

  console.warn('One of your requested fields is in a wrong format')
  return acc
}

// this function builds the arguments string
export const buildArgs = (args) => {
  if (!args || args.constructor !== Object) {
    return ''
  }
  const keys = Object.keys(args)

  return keys.reduce((acc, elm) => {
    if (args[elm] === null || undefined) {
      return acc
    }
    if (Array.isArray(args[elm]) ||
    args[elm].constructor === Object ||
    typeof args[elm] === 'boolean') {
      acc = acc + `${elm}: ${parseToGql(args[elm])},`
      return acc
    }
    acc = acc + `${elm}: "${args[elm]}",`
    return acc
  }, '')
}