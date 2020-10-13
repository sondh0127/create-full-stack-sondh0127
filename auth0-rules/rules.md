### Env Settings

SERVERLESS_URL=

### sync-user

```javascript
function (user, context, callback) {
  const auth0_id = user.user_id;
  const mutation = `mutation ($auth0_id: String!) {
    sync_auth0_user(auth0_id: $auth0_id) {
      affected_rows
    }
  }`;

  request.post(
    {
      headers: {
        "content-type": "application/json",
      },
      url: `${configuration.SERVERLESS_URL}/graphql`,
      body: JSON.stringify({ query: mutation, variables: { auth0_id } })
    },
    function(error, response, body) {
    if (error) console.log('error', error);
      else console.log(body);
      callback(error, user, context);
    }
  );
}
```

### hasura custom JWT claims

```javascript
function hasuraAccessToken(user, context, callback) {
  const namespace = 'https://hasura.io/jwt/claims'
  context.accessToken[namespace] = {
    'x-hasura-default-role': 'user',
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-user-id': user.user_id,
  }
  callback(undefined, user, context)
}
```
