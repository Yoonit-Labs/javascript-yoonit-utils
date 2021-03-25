import graphql from './graphql'

describe('GraphQL graphql Methods', () => {
  it('Tests mutation graphql method', () => {
    expect(graphql.mutation()()()).toBe(false)
    expect(graphql.mutation('mutationName')()()).toBe(false)
    expect(graphql.mutation('mutationName')({ value: 'testValue' })()).toBe(false)
    expect(
      graphql.mutation(
        'mutationName'
      )(
        {
          value: [
            123,
            223,
            5123,
            { objTest: 'test' }
          ],
          userId: 123,
          token: 'myW3bTok3n',
          test: false,
          nullTest: null
        }
      )(
        'status',
        'message',
        'id',
        'names',
        123,
        'users'
      )).toBe(`mutation {
        mutationName (
          value: [123,223,5123,{objTest:"test"}],userId: 123,token: "myW3bTok3n",test: false,
        ){
          status, message, id, names, users
          }
        }`
    )
  })

  it('Tests query graphql method', () => {
    expect(graphql.query()()()).toBe(false)
    expect(graphql.query(
      'queryName'
    )(
      {
        value: 'value1',
        valueTwo: 2,
        token: 'myW3bTok3n'
      }
    )(
      'status',
      'message',
      {
        messageTwo: [
          'messageTitle',
          'messageBody',
          {
            messageAlt: 'alternative'
          },
          {
            messageAtt: [
              'att1',
              'att2'
            ]
          }
        ]
      }
    )).toBe(
      `query {
        queryName (
          value: "value1",valueTwo: 2,token: "myW3bTok3n",
        ){
          status, message, messageTwo { messageTitle, messageBody, messageAlt { alternative }, messageAtt { att1, att2 } }
          }
        }`
    )
  })
})
