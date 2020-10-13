import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {GetTokenSilentlyOptions} from '@auth0/auth0-spa-js'
import {createUploadLink} from 'apollo-upload-client'

const httpLink = createHttpLink({uri: process.env.REACT_APP_GRAPHQL_URL})
const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_UPLOAD_URL,
})

export default function getApolloClient(
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions | undefined,
  ) => Promise<string>,
) {
  const authLink = setContext(async (_, {headers}) => {
    const token = await getAccessTokenSilently()
    if (!token) {
      return {headers}
    }
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(uploadLink).concat(httpLink),
    cache: new InMemoryCache(),
  })
}
