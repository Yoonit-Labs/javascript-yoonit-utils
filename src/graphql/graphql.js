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
 * Gabriel Moraes, Luigui Delyer & Gabriel Mule @ 2021
 */

/*
 *  Receives all the params, verify if the {query}/{mutation}Name exists and returns the next function on chain or false
 *  @method methodMaker
 *  @param  {String} type - 'query' | 'mutation'
 *  @param  {String} name - receive the query or mutation name
 *  @return {Function} currying
 *  @return {Function | Boolean} construct | false
 */
const methodMaker = type =>
  name => {
    if (!name) {
      console.warn('You need to specify an endpoint')

      return () => {
        return () => {
          return false
        }
      }
    }

    return construct.call(this, type, name)
  }

/*
*  The main function of the file. This function builds the query/mutation in parts and each part return another function
*  @method construct
*  @param  {String} type - receive the graphql type iteration, query or mutation
*  @param  {String} name - receive the name of this gql method
*  @return {Function} currying
*  @param  {Object} receive the arguments object. Receive it from query/mutation method on return
*  @return {Function} currying
*  @param  {Array} receive an array with the expected response fields. Receive it from query/mutation method on return
*  @return {String} builds a query/mutation string with all the parameters and returns it
*/
const construct = (type, name) =>
  (...args) => {
    const finalArgs = argsParser(args)

    return (...fields) => {
      if (!fields.length) {
        console.warn('You need to specify at least one response field')
        return false
      }

      const finalFields = fieldsParser(fields)
      const hasArguments = finalArgs.length ? `(${finalArgs})` : ''

      return `${type} {${name} ${hasArguments}{${finalFields}}}`
    }
  }

const replaceDoubleQuotes = elm =>
  elm.replace(
    /"/g,
    ''
  )

const replaceHeaders = args =>
  JSON
    .stringify(args)
    .replace(/^[[]|[\]]$/g, '')
    .replace(/(\r\n)|(\n)|(\r)|(\s\s)/g, '')
    .replace(/\\/g, '')

const argsParser = args =>
  replaceHeaders(args)
    .replace(/^[{]|[}]$/g, '')
    .replace(/"{(.*)}"/g, replaceDoubleQuotes)
    .replace(/"([A-z])\w+"(:| :)/g, replaceDoubleQuotes)

const fieldsParser = fields => {
  fields = fields
    .map(elm => {
      if (elm.constructor === Object) {
        return JSON
          .stringify(elm)
          .replace(/^[{]|[}]$/g, '')
      }
      return elm
    })
    .filter(elm => (
      elm.constructor !== Number &&
      elm.constructor !== Boolean
    ))

  return replaceHeaders(fields)
    .replace(/[:|"]/g, '')
    .replace(/\[/g, '{')
    .replace(/]/g, '}')
}

const graphql = {
  query: methodMaker('query'),
  mutation: methodMaker('mutation')
}

export default graphql

// const mutation = graphql
//   .mutation(
//     'mutationName'
//   )({
//     where: {
//       desired_depart_stime: {
//         _gt: '2022-03-18'
//       }
//     },
//     order_by: '{desired_depart_stime: asc}',
//     test: [
//       123,
//       456,
//       789,
//       'value',
//       {
//         key: {
//           value: 123
//         }
//       }
//     ]
//   })(
//     'status',
//     'message',
//     'id',
//     'names',
//     123,
//     'users'
//   )
//
// console.log(mutation)
