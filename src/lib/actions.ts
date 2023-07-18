import CreateProject from "@/app/create-project/page";
import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, getProjectByIdQuery, getUserQuery, projectsQuery } from "@/graphql";
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

export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);
    return res.json();
  } catch (e) { 
    throw e;
  }
};

export const uploadImage = async (imgPath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imgPath })
    });
    return res.json();
  } catch (e) {
    throw e;
  }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        }
      }
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async (category?: string, endcursor?: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};