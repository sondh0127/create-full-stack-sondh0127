# Run with a build context at the root of the project
# docker build -f packages/server/Dockerfile .
# Use a multi-stage build to reduce the final image size
# ~1GB -> ~400MB
# https://docs.docker.com/develop/develop-images/multistage-build/
FROM node:12-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ./packages/serverless ./packages/serverless

RUN yarn install --pure-lockfile --non-interactive

RUN yarn --cwd packages/serverless build

FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY packages/serverless/package.json packages/serverless/
COPY packages/serverless/ormconfig.js packages/serverless/
COPY packages/serverless/.env* packages/serverless/

COPY --from=build /usr/src/app/packages/serverless/build /usr/src/app/packages/serverless/build

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/serverless

EXPOSE 4000
CMD ["yarn", "start-production"]