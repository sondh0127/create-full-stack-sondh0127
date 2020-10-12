import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

// import jwt from "express-jwt";
// import jwksRsa from "jwks-rsa";
import getResolvers, { DecodedJwt } from "./getResolvers";
import typeDefs from "./graphql/schema";

require("cfs-dotenv").config();

interface Request {
  req: { user: DecodedJwt };
}

const origin = ["http://localhost:3000", "http://localhost:9695"];
if (process.env.CORS_ORIGIN) {
  origin.push(process.env.CORS_ORIGIN);
}

async function run() {
  const resolvers = getResolvers();
  const app = express();
  // app.use(
  //   cors({
  //     origin,
  //     credentials: true,
  //   })
  // );

  // app.use(
  //   jwt({
  //     secret: jwksRsa.expressJwtSecret({
  //       cache: true,
  //       rateLimit: true,
  //       jwksRequestsPerMinute: 5,
  //       jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  //     }),

  //     audience: process.env.AUTH0_AUDIENCE,
  //     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  //     algorithms: ["RS256"],
  //   })
  // );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: Request) => {
      const user = req.user || undefined;
      return { user };
    },
  });
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
}

run();
