export class Builder {

  parseToGql = args => {
    let newArgs = JSON.stringify(args)
    newArgs = newArgs.replace(/\"([A-z])\w+\"(\:| \:)/g, elm => { // eslint-disable-line
      elm = elm.replace(/\"/g, '') // eslint-disable-line
      return elm
    })
    return newArgs
  }
  
  // this.mutation('endpoint')({arguments}, token)(requestedFields)

  mutation(mutationName) {
    let endpoint = mutationName
    return (queryArgs, appToken) => {
      let args = this.buildMutationArgs(queryArgs, appToken)

      return (...fields) => {
        console.log(fields)
        let requestedFields = this.buildRequestedFields(fields)
        console.log(requestedFields)

        return `mutation {
          ${endpoint} (
            ${args}
          ){
            ${requestedFields}
            }
          }`
      }
    }
  }

  // this.query('endpoint')({arguments}, token)(requestedFields)
  
  query(queryName) {
    let endpoint = queryName
    return (queryArgs, appToken) => {
      let args = this.buildQueryArgs(queryArgs, appToken)

      return (...fields) => {
        console.log(fields)
        let requestedFields = this.buildRequestedFields(fields)
        console.log(requestedFields)

        return `query {
          ${endpoint} (
            ${args}
          ){
            ${requestedFields}
            }
          }`
      }
    }
  }
  
  buildRequestedFields(fields) {
    let requestedFieldsString = ''
    requestedFieldsString = requestedFieldsString + fields.reduce((...args) => this.reduceFunction(...args))
    return requestedFieldsString
  }

  reduceFunction(acc, elm){
    if (typeof elm === 'string') {
      acc = `${acc}, ${elm}`
      return acc
    }
    if (elm.constructor === Object) {
      const keys = Object.keys(elm)
      acc = `${acc}, ${keys[0]} { `
      const objBody = elm[keys[0]].reduce((...args) => this.reduceFunction(...args))
      acc = `${acc}${objBody} }`
      return acc
    }
    console.warn('Error')
    return false
  }

  buildMutationArgs(obj, token) {
    let appToken = ''
    if (token) {
      appToken = `token: "${token}",`
    }
    let fields = ''
    const keys = Object.keys(obj)
    if (!keys.length) {
      fields = `token: "${appToken}"`
    }
    return fields = Object.keys(obj).reduce((acc, elm) => {
      if (obj[elm] === null || obj[elm] === undefined || obj[elm] === '') {
        return acc
      }
      if (Array.isArray(obj[elm]) || obj[elm].constructor === Object) {
        acc = acc + `${elm}: ${this.parseToGql(obj[elm])},`
        return acc
      }
      if (typeof obj[elm] === 'boolean' || typeof obj[elm] === 'number' || obj[elm] === 'POST' || obj[elm] === 'GET' || typeof obj[elm] === 'object') {
        acc = acc + `${elm}: ${obj[elm]},`
        return acc
      }
      acc = acc = acc + `${elm}: "${obj[elm]}",`
      return acc
    }, appToken)
  }

  buildQueryArgs(queryArgs, token) {
    let appToken = ''
    if (token) {
      appToken = `token: "${token}",`
    }
    let fields = ''
    const keys = Object.keys(queryArgs)
    if (!keys.length) {
      fields = `token: "${appToken}"`
    }
    return fields = keys.reduce((acc, arg) => {
      console.log(acc)
      if (queryArgs[arg] === null || undefined) {
        console.log(acc, '1')
        return acc
      }
      if (typeof queryArgs[arg] === 'boolean' || typeof queryArgs[arg] === 'number') {
        acc = acc + `${arg}: ${queryArgs[arg]},`
        console.log(acc, '2')
        return acc
      }
      console.log(acc, '2,4')
      acc = acc + `${arg}: "${queryArgs[arg]}",`
      console.log(arg, '3')
      return acc
    }, appToken)
  }
}