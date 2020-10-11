🎉 _Create Full Stack has finished:_

- _Scaffolding your monorepo with your platform and feature selections_
- _Installing packages_
- _Generating configuration instructions based on your selection_

**Follow the steps below to run locally.**

## 1. Setup Docker

_Docker runs the Postgres DB._

- Install Docker from their [website](https://docs.docker.com/get-docker/)
- Open the Docker app

## 2. Setup Expo

_Expo simplifies mobile development by handling Auth redirects and removing XCode and Android studio dependencies._

If you're new to Expo, register (it's free) by running:

```bash
yarn expo register
```

OR login if you have an account

```bash
yarn expo login
```

## 3. Signup for Auth0

[Signup](https://auth0.com/signup) and create an Auth0 tenant. Change the default tenant name (ex. "development-my-full-stack") to make it readable. Auth0 is free for up to 7k users.

**Save your tenant domain for steps below**

<img alt="Auth0 Signup" src="https://create-full-stack.com/img/readme/auth0_signup.png" width="512"/>

## 4. Create an Auth0 rule

_This Auth0 rule adds the required [custom JWT claims for Hasura auth](https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html)._

- Rules > CREATE RULE

<img alt="Auth0 Create Rule" src="https://create-full-stack.com/img/readme/auth0_create_rule.png" width="512"/>

- Select the "Empty rule" template

<img alt="Auth0 Rule Select" src="https://create-full-stack.com/img/readme/auth0_rule_select.png" width="512"/>

- Name the rule (ex. "hasura custom JWT claims")
- Paste the code snippet below into the "Script" section

```js
function hasuraAccessToken(user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.accessToken[namespace] = {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.user_id,
  };
  callback(undefined, user, context);
}
```

<img alt="Auth0 Rule" src="https://create-full-stack.com/img/readme/auth0_rule.png" width="512"/>

## 5. Create an Auth0 API

_This stores the auth configuration for the server._

- APIs > CREATE API

<img alt="Auth0 Create API" src="https://create-full-stack.com/img/readme/auth0_create_api.png" width="512"/>

- Set the name (ex. "server")
- Set the identifier (audience) to "server"

<img alt="Auth0 API Identifier" src="https://create-full-stack.com/img/readme/auth0_api_identifier.png" width="512"/>

- Click "Settings"
- Enable "Allow Offline Access"

<img alt="Auth0 API Offline Access" src="https://create-full-stack.com/img/readme/auth0_api_offline_access.png" width="512"/>

In `hasura/.env.development` fill in the field

<img alt="Auth0 API" src="https://create-full-stack.com/img/readme/auth0_api_settings.png" width="512"/>

```
HASURA_GRAPHQL_JWT_SECRET={"jwk_url":"https://[YOUR AUTH0 TENANT DOMAIN]/.well-known/jwks.json","audience":"[YOUR AUTH0 API AUDIENCE]"}
```

**Save your API audience for steps below**

## 6. Create an Auth0 "Single Page Application"

_This stores the auth configuration for web._

- Applications > CREATE APPLICATION

<img alt="Auth0 Create Application" src="https://create-full-stack.com/img/readme/auth0_create_application.png" width="512"/>

- Set the name (ex. "web")
- Select "Single Page Web Applications"

<img alt="Auth0 Single Page Web App" src="https://create-full-stack.com/img/readme/auth0_spa.png" width="512"/>

- Click "Settings"
- Set "Allowed Callback URLs", "Allowed Logout URLs", and "Allowed Web Origins" to "http://localhost:3000"

<img alt="Auth0 Single Page Web App URLs" src="https://create-full-stack.com/img/readme/auth0_spa_urls.png" width="512"/>

In `packages/web/.env.development` fill in the fields from the server API you created above and your Single Page Web Application's "Settings" page.

<img alt="Auth0 Single Page Web App URLs" src="https://create-full-stack.com/img/readme/auth0_spa_settings.png" width="512"/>

```
REACT_APP_AUTH0_AUDIENCE=[YOUR AUTH0 API AUDIENCE]
REACT_APP_AUTH0_DOMAIN=[YOUR AUTH0 TENANT DOMAIN]
REACT_APP_AUTH0_CLIENT_ID=[YOUR AUTH0 SINGLE PAGE APPLICATION CLIENT ID]
```

## 7. Create an Auth0 "Native" Application

_This stores the auth configuration for mobile._

- Applications > CREATE APPLICATION

<img alt="Auth0 Create Application" src="https://create-full-stack.com/img/readme/auth0_create_application.png" width="512"/>

- Set the name (ex. "mobile")
- Select "Native"

<img alt="Auth0 Native" src="https://create-full-stack.com/img/readme/auth0_native.png" width="512"/>

- Click "Settings"
- Set "Allowed Callback URLs" to "https://auth.expo.io/@[YOUR EXPO USERNAME]/[YOUR EXPO APP SLUG]"
  - Get YOUR EXPO USERNAME by running `expo whoami`
  - Get YOUR EXPO APP SLUG from [`packages/mobile/app.json`](packages/mobile/app.json) `"slug"`

<img alt="Auth0 Native Application URLs" src="https://create-full-stack.com/img/readme/auth0_native_urls.png" width="512"/>

- Set "Refresh Token Behavior" to "Rotating"

<img alt="Auth0 Native Refresh Token" src="https://create-full-stack.com/img/readme/auth0_native_refresh_token.png" width="512"/>

In `packages/mobile/.env.development` fill in the fields from the server API you created above and your Native Application's "Settings" page.

<img alt="Auth0 Native Application Settings" src="https://create-full-stack.com/img/readme/auth0_native_settings.png" width="512"/>

```
AUTH0_AUDIENCE=[YOUR AUTH0 API AUDIENCE]
AUTH0_DOMAIN=[YOUR AUTH0 DOMAIN]
AUTH0_CLIENT_ID=[YOUR AUTH0 NATIVE APPLICATION CLIENT ID]
```

## 8. Switch Universal Login to "New"

_It's recommended you use the "New Universal Login Experience" which stores user credentials on page refresh. This is also helpful for developing so you don't need to re-authenticate to view changes you make._

- Navigate to "Universal Login"
- Switch from "Classic" to "New"

<img alt="Auth0 Universal Login" src="https://create-full-stack.com/img/readme/auth0_universal_login.png" width="512"/>

## 9. Start

🎉 _Congrats! Your full stack is configured and ready for development._

From the root of the project run:

```bash
yarn start
```

URLs available:

- web: [http://localhost:3000](http://localhost:3000)
  - **This redirects to your [Auth0 login page](https://auth0.com/docs/universal-login)**
- mobile (expo devtools): [http://localhost:19002](http://localhost:19002)
- backend: [http://localhost:8080/v1/graphql](http://localhost:8080/v1/graphql)
  - **API requires authorization to access**

## 10. Access the Hasura console

With the Hasura backend up, run:

```bash
cd hasura/
yarn hasura console
```

_Learn more about Hasura from their [docs](https://hasura.io/docs/1.0/graphql/core/index.html)._

## 11. What's next

- Follow the [Hasura tutorial](https://create-full-stack.com/docs/tutorial_hasura) to update your full stack
- Check out [available scripts](https://create-full-stack.com/docs/available_scripts)
