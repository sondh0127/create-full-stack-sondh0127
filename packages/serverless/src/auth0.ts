import fetch from "node-fetch";

import { Auth0InfoResult, SyncAuth0UserResult } from "./graphql/__generated__";

const getManagementAccessToken = async () => {
  const response = await fetch(`${process.env.AUTH0_MANAGEMENT_OAUTH_TOKEN}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: `${process.env.AUTH0_MANAGEMENT_CLIENT_ID}`,
      client_secret: `${process.env.AUTH0_MANAGEMENT_CLIENT_SECRET}`,
      audience: `${process.env.AUTH0_MANAGEMENT_AUDIENCE}/`,
      grant_type: `${process.env.AUTH0_MANAGEMENT_GRANT_TYPE}`,
    }),
    headers: {
      "Content-Type": `application/json`,
    },
  });

  const respObj = (await response.json()) as {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
  };
  return respObj.access_token;
};

const getUserFromAuth0 = async (
  userId: string,
  token: string
): Promise<Auth0InfoResult> => {
  const params = new URLSearchParams({
    q: `user_id:"${userId}"`,
    search_engine: "v3",
  });

  const url = `${process.env.AUTH0_MANAGEMENT_AUDIENCE}/users?${params}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });

  const respObj = await response.json();
  return respObj[0];
};

const syncUserAuth0Action = async (
  userId: string
): Promise<SyncAuth0UserResult> => {
  const mutation = `mutation ($auth0_id: String!) {
    insert_users(objects: [{auth0_id: $auth0_id}], on_conflict: {constraint: users_auth0_id_key, update_columns: []}) {
      affected_rows
    }
  }`;

  const response = await fetch(`${process.env.HASURA_GRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
    body: JSON.stringify({
      query: mutation,
      variables: { auth0_id: userId },
    }),
  });
  const respObj = await response.json();

  return respObj.data.insert_users as SyncAuth0UserResult;
};

export { getUserFromAuth0, getManagementAccessToken, syncUserAuth0Action };
