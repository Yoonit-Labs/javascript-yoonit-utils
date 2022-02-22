import graphql from './graphql'

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'info').mockImplementation(() => {})
  jest.spyOn(console, 'debug').mockImplementation(() => {})
})

describe('GraphQL helpers', () => {
  it('[Mutation] Empty input expected to be false', () =>
    expect(graphql.mutation()()())
      .toBe(false)
  )

  it('[Mutation] Only name expected to be false', () =>
    expect(graphql.mutation('mutationName')()())
      .toBe(false)
  )

  it('[Mutation] Only name and fields expected to be false', () =>
    expect(
      graphql
        .mutation('mutationName')({ value: 'testValue' })()
    )
      .toBe(false)
  )

  it('[Mutation] A complete example', () =>
    expect(
      graphql
        .mutation(
          'mutationName'
        )({
          where: {
            desired_depart_stime: {
              _gt: '2022-03-18'
            }
          },
          order_by: '{desired_depart_stime: asc}',
          test: [
            123,
            456,
            789,
            'value',
            {
              key: {
                value: 123
              }
            }
          ]
        })(
          'status',
          'message',
          'id',
          'names',
          123,
          'users'
        )
    )
      .toBe('mutation {mutationName (where:{desired_depart_stime:{_gt:"2022-03-18"}},order_by:{desired_depart_stime: asc},test:[123,456,789,"value",{key:{value:123}}]){status,message,id,names,users}}')
  )

  it('[Query] Empty input expected to be false', () =>
    expect(graphql.query()()())
      .toBe(false)
  )

  it('[Query] A complete example', () =>
    expect(
      graphql
        .query(
          'queryName'
        )({
          where: {
            desired_depart_stime: {
              _gt: '2022-03-18'
            }
          },
          order_by: '{desired_depart_stime: asc}',
          test: [
            123,
            456,
            789,
            'value',
            {
              key: {
                value: 123
              }
            }
          ]
        })(
          'status',
          'message',
          {
            messageTwo: [
              'messageTitle',
              'messageBody',
              {
                messageAlt: [
                  'alternative'
                ]
              }
            ]
          },
          {
            messageAtt: [
              'att1',
              'att2'
            ]
          }
        )
    )
      .toBe('query {queryName (where:{desired_depart_stime:{_gt:"2022-03-18"}},order_by:{desired_depart_stime: asc},test:[123,456,789,"value",{key:{value:123}}]){status,message,messageTwo{messageTitle,messageBody,{messageAlt{alternative}}},messageAtt{att1,att2}}}')
  )
})
