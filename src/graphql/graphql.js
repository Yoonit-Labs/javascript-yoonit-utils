/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * Yoonit Utils
 * Couple of functions in JS to speed up development and give some help
 *
 * Gabriel Moraes & Luigui Delyer @ 2020-2021
 */

/*
 *  Parses arguments on query and mutation for graphql
 *  @method parseToGql
 *  @param  {Array | Object | Boolean} Receive an array, object or a boolean to parse
 *  @return {String} Returns the parsed parameter
 */
const parseToGql = args => {
  const newArgs = JSON.stringify(args)

  return newArgs.replace(
    /"([A-z])\w+"(:| :)/g,
    elm =>
      elm.replace(
        /"/g,
        ''
      )
  )
}

/*
 *  The main function of the file. This function builds the query/mutation in parts and each part return another function
 *  @method PromiseMaker
 *  @param  {String} receive the mutation name
 *  @return {Function} receive the arguments object from the previous function and call buildArgs to build it
 *  @param  {Object} receive the arguments object. Receive it from {query | mutation} method on return
 *  @return {Function} receive the expected fields array from the previous function and call buildRequetedFields to build it
 *  @param  {Array} receive an array with the expected response fields. Receive it from {query | mutation} method on return
 *  @return {String} builds a query/mutation string with all the parameters and returns it
 */
const construct = (type, methodName) => {
  return args => {
    const finalArgs = buildArgs(args)

    return (...fields) => {
      if (!fields.length) {
        console.warn('You need to specify at least one response field')
        return false
      }

      const finalFields = buildRequestedFields(fields)
      const hasArguments = finalArgs.length ? `(${finalArgs})` : ''

      return `${type} {${methodName} ${hasArguments}{${finalFields}}}`
    }
  }
}

/*
 *  Receives all the params, verify if the mutationName exists and returns the next function on chain or false
 *  @method mutation
 *  @param  {String} receive the mutation name
 *  @param  {Object} receive the arguments object. Pass it to construct on return.
 *  @param  {Array} receive an array with the expected response fields. Pass it to construct on return.
 *  @return {Function | Boolean} construct | false
 */
const mutation = name => {
  if (!name) {
    console.warn('You need to specify an endpoint')

    return () => {
      return () => {
        return false
      }
    }
  }

  return construct.call(this, 'mutation', name)
}

/*
 *  Receives all the params, verify if the queryName exists and returns the next function on chain or false
 *  @method query
 *  @param  {String} receive the query name
 *  @return {Function | Boolean} construct | false
 */
const query = name => {
  if (!name) {
    console.warn('You need to specify an endpoint')

    return () => {
      return () => {
        return false
      }
    }
  }

  return construct.call(this, 'query', name)
}

/*
 *  Calls reduceFunction to construct the requested fields string
 *  @method buildRequestedFields
 *  @param  {Array} receive n params to pass through reduce function
 *  @return {String} returns the result from reduce
 */
const buildRequestedFields = fields =>
  fields.reduce((...args) =>
    reduceFunction(...args)
  )

/*
 *  Its called by buildRequestedFields, its the reduce function that it's used to build the requested fields string
 *  @method reduceFunction
 *  @param  {acc, elm} these parameters are given on reduce
 *  @return {String}
 */
const reduceFunction = (acc, elm) => {
  if (typeof elm === 'string') {
    acc = `${acc}, ${elm}`

    return acc
  }

  if (elm.constructor === Object) {
    const keys = Object.keys(elm)
    const keyBody = elm[keys[0]]

    if (Array.isArray(keyBody)) {
      const objBody = keyBody.reduce((...args) =>
        reduceFunction(...args)
      )

      acc = `${acc}, ${keys[0]} {${objBody}}`

      return acc
    }

    acc = `${acc}, ${keys[0]} {${keyBody}}`

    return acc
  }

  console.warn('One of your requested fields is in a wrong format')

  return acc
}

/*
 *  Builds the arguments string
 *  @method buildArgs
 *  @param  {Object} receive an object with the arguments
 *  @return {String} returns the string to build the query/mutation
 */
const buildArgs = args => {
  if (!args || args.constructor !== Object) {
    return ''
  }

  const keys = Object.keys(args)

  return keys.reduce((acc, elm, indx) => {
    let comma = ','
    if (indx === 0) {
      comma = ''
    }

    if (args[elm] === null || undefined) {
      return acc
    }

    acc = `${acc}${comma}${elm}: ${parseToGql(args[elm])}`
    return acc
  }, '')
}

const graphql = {
  query,
  mutation
}

export default graphql
