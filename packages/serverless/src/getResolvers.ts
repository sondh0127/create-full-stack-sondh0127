import AWS from "aws-sdk";

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
          return response;
        } catch (error) {
          const res = { affected_rows: 0 };
          return res;
        }
      },
      single_upload: async (_, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;

        // Create an upload stream that goes to S3
        const fileStream = createReadStream();

        const s3Bucket = new AWS.S3({
          endpoint: process.env.MINIO_END_POINT,
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
          s3ForcePathStyle: true, // needed with minio?
          signatureVersion: "v4",
        });

        const result = await s3Bucket
          .upload({
            Bucket: process.env.DESTINATION_BUCKET_NAME || "sondh0127",
            Key: filename,
            Body: fileStream,
          })
          .promise();

        // Get the link representing the uploaded file
        const url = result.Location;

        // (optional) save it to our database
        return { filename, mimetype, encoding, url };
      },
    },
  };
}
