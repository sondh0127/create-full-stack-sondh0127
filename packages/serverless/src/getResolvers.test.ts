import {ApolloServer} from 'apollo-server-express'
import {createTestClient} from 'apollo-server-testing'
import {
  CreateTodoDocument,
  DeleteTodoDocument,
  TodosDocument,
  UpdateTodoDocument,
} from 'common'

import getResolvers from './getResolvers'
import typeDefs from './graphql/schema'

let server: ApolloServer

beforeEach(async () => {
  const resolvers = getResolvers()
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({user: {sub: '1'}}),
  })
})

afterEach(() => {})

it('fetch User', async () => {
  // const { query } = createTestClient(server);
  // const result = await query({ query: TodosDocument });
  // expect(result).toMatchSnapshot();
})
