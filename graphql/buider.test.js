import * as Builder from './builder'

describe('GraphQL Builder Methods', () => {
  it('Tests parseToGql method', () => {
    expect(Builder.parseToGql(['This', 'is', 'a', 'test', { objTest: 'test' }])).toBe("[\"This\",\"is\",\"a\",\"test\",{objTest:\"test\"}]")
  })

  it('Tests mutation builder method', () => {
    expect(Builder.mutation()).toBe(false)
    expect(Builder.mutation('mutationName')()()).toBe(false)
    expect(Builder.mutation('mutationName')({ value: 'testValue' })()).toBe(false)
    expect(
      Builder.mutation(
        'mutationName'
      )(
        { 
          'value': [
            123,
            223,
            5123
          ],
          'userId': 'noId',
          token: 'myW3bTok3n',
          teste: false,
          nullTest: null
        }
      )(
        'status',
        'message',
        'id',
        'names',
        123,
        'users'
      )).toBe(
        `mutation {
        mutationName (
          value: [123,223,5123],userId: "noId",token: "myW3bTok3n",teste: false,
        ){
          status, message, id, names, users
          }
        }`
      )
    })

  it('Tests query builder method', () => {
    expect(Builder.query()).toBe(false)
    expect(Builder.query(
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
        'messageTwo': [
          'messageTitle',
          'messageBody',
          { 
            'messageAlt': 'alternative'
          },
          {
            'messageAtt': [
              'att1',
              'att2'
            ]
          }
        ]
      }
    )).toBe(
      `query {
        queryName (
          value: "value1",valueTwo: "2",token: "myW3bTok3n",
        ){
          status, message, messageTwo { messageTitle, messageBody, messageAlt { alternative }, messageAtt { att1, att2 } }
          }
        }`
    )
  })

})