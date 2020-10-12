import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth0InfoResult = {
  __typename?: "Auth0InfoResult";
  user_id?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  email_verified?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["String"]>;
  last_login?: Maybe<Scalars["String"]>;
  last_ip?: Maybe<Scalars["String"]>;
  logins_count?: Maybe<Scalars["Int"]>;
  updated_at?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type SyncAuth0UserResult = {
  __typename?: "SyncAuth0UserResult";
  affected_rows?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  auth0_info?: Maybe<Auth0InfoResult>;
};

export type QueryAuth0InfoArgs = {
  auth0_id: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  sync_auth0_user: SyncAuth0UserResult;
};

export type MutationSyncAuth0UserArgs = {
  auth0_id: Scalars["String"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Auth0InfoResult: ResolverTypeWrapper<Auth0InfoResult>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  SyncAuth0UserResult: ResolverTypeWrapper<SyncAuth0UserResult>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Auth0InfoResult: Auth0InfoResult;
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  Int: Scalars["Int"];
  SyncAuth0UserResult: SyncAuth0UserResult;
  Query: {};
  Mutation: {};
}>;

export type Auth0InfoResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Auth0InfoResult"] = ResolversParentTypes["Auth0InfoResult"]
> = ResolversObject<{
  user_id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email_verified?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  created_at?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  last_login?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  last_ip?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  logins_count?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  locale?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SyncAuth0UserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SyncAuth0UserResult"] = ResolversParentTypes["SyncAuth0UserResult"]
> = ResolversObject<{
  affected_rows?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  auth0_info?: Resolver<
    Maybe<ResolversTypes["Auth0InfoResult"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAuth0InfoArgs, "auth0_id">
  >;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  sync_auth0_user?: Resolver<
    ResolversTypes["SyncAuth0UserResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSyncAuth0UserArgs, "auth0_id">
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Auth0InfoResult?: Auth0InfoResultResolvers<ContextType>;
  SyncAuth0UserResult?: SyncAuth0UserResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
