"use client";

import { Account, Client, Databases, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export const appwriteReady = Boolean(endpoint && projectId);

export function getBrowserAppwrite() {
  if (!appwriteReady) {
    return null;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  return {
    account: new Account(client),
    databases: new Databases(client),
    ID
  };
}
