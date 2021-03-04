export class Builder {

  // this function parses the arrays on mutations arguments so graphql doesnt fuck up
  parseToGql = args => {
    let newArgs = JSON.stringify(args)
    newArgs = newArgs.replace(/\"([A-z])\w+\"(\:| \:)/g, elm => {
      elm = elm.replace(/\"/g, '')
      return elm
    })
    return newArgs
  }

  // this function constructs the query/mutation body calling other functions
  construct(type, methodName) {
    if (!methodName) {
      console.warn("You need to send an endpoint")
      return false
    }

    return (args, appToken) => {
      let argString = this.buildArgs(args, appToken)

      return (...fields) => {
        if (!fields.length) {
          console.warn("You need to specify at least one response field")
          return false 
        }
        let requestedFields = this.buildRequestedFields(fields)

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
  mutation(mutationName) {
    return this.construct.call(this, 'mutation', mutationName)
  }

  // this is the main query function, it calls the construct function and its called by the user
  // this.query('endpoint')({arguments}, token)(requestedFields)
  query(queryName) {
    return this.construct.call(this, 'query', queryName)
  }
  
  // this function returns the requested fields string
  buildRequestedFields(fields) {
    return fields.reduce((...args) => this.reduceFunction(...args))
  }

  // this function builds the requested fields string
  reduceFunction(acc, elm){
    if (typeof elm === 'string') {
      acc = `${acc}, ${elm}`
      return acc
    }
    if (elm.constructor === Object) {
      let keys = Object.keys(elm)
      let keyBody = elm[keys[0]]

      if (Array.isArray(keyBody)) {
        const objBody = keyBody.reduce((...args) => this.reduceFunction(...args))
        acc = `${acc}, ${keys[0]} { ${objBody} }`
        return acc
      }
  
      acc = `${acc}, ${keys[0]} { ${keyBody} }`
      return acc
    }

    console.warn('One of your requested fields is in a wrong format')
    return false
  }


  // this function builds the query arguments string
  buildArgs(args) {
    if (!args.constructor === Object) {
      console.warn("Your query arguments must be an Object!")
      return ''
    }
    const keys = Object.keys(args)
    let fields = ''

    return fields = keys.reduce((acc, elm) => {
      if (mutationArgs[elm] === null || undefined) {
        return acc
      }
      if (Array.isArray(mutationArgs[elm]) ||
        mutationArgs[elm].constructor === Object) {
        acc = acc + `${elm}: ${this.parseToGql(mutationArgs[elm])},`
        return acc
      }
      acc = acc + `${elm}: "${mutationArgs[elm]}",`
      return acc
    }, '')
  }
}