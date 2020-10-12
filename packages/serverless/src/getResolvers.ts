import {
  getManagementAccessToken,
  getUserFromAuth0,
  syncUserAuth0Action,
} from "./auth0";
import { QueryAuth0InfoArgs, Resolvers } from "./graphql/__generated__";

export interface DecodedJwt {
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  scope: string;
  sub: string;
}

interface Context {
  user: DecodedJwt;
}

export default function getResolvers(): Resolvers {
  // const todoRepository = connection.getRepository(Todo);
  return {
    Query: {
      auth0_info: async (_, args: QueryAuth0InfoArgs) => {
        try {
          const token = await getManagementAccessToken();
          if (token) {
            const response = await getUserFromAuth0(args.auth0_id, token);
            return response;
          }
          return undefined;
        } catch (error) {
          return undefined;
        }
      },
    },
    Mutation: {
      sync_auth0_user: async (_, args, context: Context) => {
        try {
          const response = await syncUserAuth0Action(args.auth0_id);
          console.log(
            `🇻🇳 [LOG]: defaultfunctiongetResolvers -> response`,
            response
          );
          return response;
        } catch (error) {
          const res = { affected_rows: 0 };
          return res;
        }
      },
    },
  };
}
