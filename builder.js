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
        let requestedFields = this.buildRequestedFields(fields)

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
        let requestedFields = this.buildRequestedFields(fields)

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
    return fields.reduce((...args) => this.reduceFunction(...args))
  }

  reduceFunction(acc, elm){
    if (typeof elm === 'string') {
      acc = `${acc}, ${elm}`
      return acc
    }

    if (elm.constructor === Object) {
      const keys = Object.keys(elm)
      const objBody = elm[keys[0]].reduce((...args) => this.reduceFunction(...args))
      acc = `${acc}, ${keys[0]} { ${objBody} }`
      return acc
    }

    console.warn('One of your requested fields is in a wrong format')
    return false
  }

  buildMutationArgs(mutationArgs, token) {
    let appToken = token ? `token: "${token}",` : ''
    const keys = Object.keys(mutationArgs)
    let fields = keys.length ? '' : `token: "${appToken}"`

    return fields = keys.reduce((acc, elm) => {
      if (mutationArgs[elm] === null || mutationArgs[elm] === undefined || mutationArgs[elm] === '') {
        return acc
      }
      if (Array.isArray(mutationArgs[elm]) || mutationArgs[elm].constructor === Object) {
        acc = acc + `${elm}: ${this.parseToGql(mutationArgs[elm])},`
        return acc
      }
      if (typeof mutationArgs[elm] === 'boolean' || typeof mutationArgs[elm] === 'number' || mutationArgs[elm] === 'POST' || mutationArgs[elm] === 'GET' || typeof mutationArgs[elm] === 'object') {
        acc = acc + `${elm}: ${mutationArgs[elm]},`
        return acc
      }
      acc = acc + `${elm}: "${mutationArgs[elm]}",`
      return acc
    }, appToken)
  }

  buildQueryArgs(queryArgs, token) {
    let appToken = token ? `token: "${token}",` : ''
    const keys = Object.keys(queryArgs)
    let fields = keys.length ? '' : `token: "${appToken}"`

    return fields = keys.reduce((acc, arg) => {
      if (queryArgs[arg] === null || undefined) {
        return acc
      }
      if (typeof queryArgs[arg] === 'boolean' || typeof queryArgs[arg] === 'number') {
        acc = acc + `${arg}: ${queryArgs[arg]},`
        return acc
      }
      acc = acc + `${arg}: "${queryArgs[arg]}",`
      return acc
    }, appToken)
  }
}