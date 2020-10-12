import { gql } from "apollo-server-express";

export default gql`
  type Auth0InfoResult {
    user_id: String
    email: String
    email_verified: Boolean
    name: String
    picture: String
    nickname: String
    created_at: String
    last_login: String
    last_ip: String
    logins_count: Int
    updated_at: String
    locale: String
  }

  type SyncAuth0UserResult {
    affected_rows: Int
  }

  type UploadedFileResult {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    auth0_info(auth0_id: String!): Auth0InfoResult
    uploads: [UploadedFileResult]
  }

  type Mutation {
    sync_auth0_user(auth0_id: String!): SyncAuth0UserResult!
    single_upload(file: Upload!): UploadedFileResult!
  }
`;
