import { fallbackContent } from "../lib/site-content.js";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID || "smart_ro_cms";
const collectionId = process.env.APPWRITE_SITE_CONTENT_COLLECTION_ID || "site_content";
const documentId = process.env.APPWRITE_SITE_CONTENT_DOCUMENT_ID || "smart-ro";
const adminEmail = process.env.APPWRITE_ADMIN_EMAIL;
const adminPassword = process.env.APPWRITE_ADMIN_PASSWORD;

if (!projectId || !apiKey) {
  console.error("Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID or APPWRITE_API_KEY in the environment.");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  "X-Appwrite-Project": projectId,
  "X-Appwrite-Key": apiKey
};

async function request(path, options = {}) {
  const response = await fetch(`${endpoint}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) }
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok && response.status !== 409) {
    throw new Error(`${options.method || "GET"} ${path} failed: ${response.status} ${text}`);
  }

  return { status: response.status, body };
}

async function ensureDatabase() {
  const result = await request("/databases", {
    method: "POST",
    body: JSON.stringify({ databaseId, name: "Smart RO CMS" })
  }).catch(e => {
    if (e.message && e.message.includes('403')) return { status: 409 }; 
    throw e;
  });
  console.log(result.status === 409 ? "Database already exists." : "Database created.");
}

async function ensureCollection() {
  const result = await request(`/databases/${databaseId}/collections`, {
    method: "POST",
    body: JSON.stringify({
      collectionId,
      name: "Site Content",
      documentSecurity: true,
      permissions: ['read("any")']
    })
  }).catch(e => {
    if (e.message && e.message.includes('403')) return { status: 409 };
    throw e;
  });
  console.log(result.status === 409 ? "Collection already exists." : "Collection created.");
}

async function ensureContentAttribute() {
  const result = await request(`/databases/${databaseId}/collections/${collectionId}/attributes/string`, {
    method: "POST",
    body: JSON.stringify({
      key: "content",
      size: 500000,
      required: true
    })
  });
  console.log(result.status === 409 ? "Content attribute already exists." : "Content attribute created.");
}

async function waitForAttribute() {
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    const result = await request(`/databases/${databaseId}/collections/${collectionId}/attributes/content`);
    if (result.body?.status === "available") {
      console.log("Content attribute is available.");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  throw new Error("Content attribute did not become available in time.");
}

async function ensureDocument() {
  const data = { content: JSON.stringify(fallbackContent, null, 2) };
  const create = await request(`/databases/${databaseId}/collections/${collectionId}/documents`, {
    method: "POST",
    body: JSON.stringify({
      documentId,
      data,
      permissions: ['read("any")', 'update("users")', 'delete("users")']
    })
  });

  if (create.status !== 409) {
    console.log("Seed document created.");
    return;
  }

  await request(`/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`, {
    method: "PATCH",
    body: JSON.stringify({ data })
  });
  console.log("Seed document already existed; content refreshed.");
}

async function ensureAdminUser() {
  if (!adminEmail || !adminPassword) {
    console.log("Admin user skipped. Add APPWRITE_ADMIN_EMAIL and APPWRITE_ADMIN_PASSWORD to create one.");
    return;
  }

  const result = await request("/users", {
    method: "POST",
    body: JSON.stringify({
      userId: "unique()",
      email: adminEmail,
      password: adminPassword,
      name: "Smart RO Admin"
    })
  }).catch(e => {
    if (e.message && e.message.includes('409')) return { status: 409 };
    throw e;
  });
  console.log(result.status === 409 ? "Admin user already exists or email is taken." : "Admin user created.");
}

await ensureDatabase();
await ensureCollection();
await ensureContentAttribute();
await waitForAttribute();
await ensureDocument();
await ensureAdminUser();

console.log("");
console.log("Appwrite setup complete. Use these values in .env.local:");
console.log(`NEXT_PUBLIC_APPWRITE_ENDPOINT=${endpoint}`);
console.log(`NEXT_PUBLIC_APPWRITE_PROJECT_ID=${projectId}`);
console.log(`NEXT_PUBLIC_APPWRITE_DATABASE_ID=${databaseId}`);
console.log(`NEXT_PUBLIC_APPWRITE_SITE_CONTENT_COLLECTION_ID=${collectionId}`);
console.log(`NEXT_PUBLIC_APPWRITE_SITE_CONTENT_DOCUMENT_ID=${documentId}`);
console.log(`APPWRITE_DATABASE_ID=${databaseId}`);
console.log(`APPWRITE_SITE_CONTENT_COLLECTION_ID=${collectionId}`);
console.log(`APPWRITE_SITE_CONTENT_DOCUMENT_ID=${documentId}`);
