import { Client, Databases } from "appwrite";
import { fallbackContent } from "./site-content";

export async function getSiteContent() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_SITE_CONTENT_COLLECTION_ID;
  const documentId = process.env.APPWRITE_SITE_CONTENT_DOCUMENT_ID || "smart-ro";

  if (!endpoint || !projectId || !apiKey || !databaseId || !collectionId) {
    return fallbackContent;
  }

  try {
    const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
    const databases = new Databases(client);
    const document = await databases.getDocument(databaseId, collectionId, documentId);
    return document.content ? JSON.parse(document.content) : fallbackContent;
  } catch (error) {
    console.warn("Using fallback content because Appwrite content fetch failed.", error);
    return fallbackContent;
  }
}
