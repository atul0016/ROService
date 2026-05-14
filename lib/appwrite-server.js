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
    const response = await fetch(
      `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`,
      {
        headers: {
          "X-Appwrite-Project": projectId,
          "X-Appwrite-Key": apiKey,
          "X-Appwrite-Response-Format": "1.6.0"
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`Appwrite content fetch failed with ${response.status}`);
    }

    const document = await response.json();
    return document.content ? JSON.parse(document.content) : fallbackContent;
  } catch (error) {
    console.warn("Using fallback content because Appwrite content fetch failed.", error);
    return fallbackContent;
  }
}
