import { createUserMutation, getUserQuery } from "@/graphql";
import { Query } from "@grafbase/sdk/dist/src/query";
import { GraphQLClient } from "graphql-request";

const isProd = process.env.NODE_ENV === "production";
const apiUrl = isProd ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : "http://127.0.0.1:4000/graphql";
const apiKey = isProd ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "letmein";
const serverUrl = isProd ? process.env.NEXT_PUBLIC_SERVER_URL || "" : "http://localhost:3000";
const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (e) {
    throw e;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name, email, avatarUrl
    }
  };
  return makeGraphQLRequest(createUserMutation, variables);
};