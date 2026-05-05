"use client";

import { useMemo, useState } from "react";
import { getBrowserAppwrite, appwriteReady } from "../../lib/appwrite-browser";
import { fallbackContent } from "../../lib/site-content";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || process.env.APPWRITE_DATABASE_ID;
const collectionId =
  process.env.NEXT_PUBLIC_APPWRITE_SITE_CONTENT_COLLECTION_ID ||
  process.env.APPWRITE_SITE_CONTENT_COLLECTION_ID;
const documentId =
  process.env.NEXT_PUBLIC_APPWRITE_SITE_CONTENT_DOCUMENT_ID ||
  process.env.APPWRITE_SITE_CONTENT_DOCUMENT_ID ||
  "smart-ro";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(JSON.stringify(fallbackContent, null, 2));
  const [status, setStatus] = useState("Local editor ready. Add Appwrite env values to save to cloud.");
  const [signedIn, setSignedIn] = useState(false);
  const appwrite = useMemo(() => getBrowserAppwrite(), []);

  const canUseCloud = appwriteReady && databaseId && collectionId && appwrite;

  async function signIn(event) {
    event.preventDefault();
    if (!canUseCloud) {
      setStatus("Appwrite is not configured yet. Fill .env.local from .env.example first.");
      return;
    }

    try {
      await appwrite.account.createEmailPasswordSession(email, password);
      setSignedIn(true);
      setStatus("Signed in. Loading current cloud content...");
      const document = await appwrite.databases.getDocument(databaseId, collectionId, documentId);
      setContent(document.content || JSON.stringify(fallbackContent, null, 2));
      setStatus("Cloud content loaded.");
    } catch (error) {
      setStatus(error.message || "Login failed.");
    }
  }

  async function saveContent(event) {
    event.preventDefault();
    try {
      JSON.parse(content);
    } catch {
      setStatus("Invalid JSON. Fix the content before saving.");
      return;
    }

    if (!canUseCloud || !signedIn) {
      setStatus("Preview is local only. Configure Appwrite and sign in to save.");
      return;
    }

    try {
      await appwrite.databases.updateDocument(databaseId, collectionId, documentId, { content });
      setStatus("Saved to Appwrite. The public site will refresh within about 60 seconds.");
    } catch (error) {
      setStatus(error.message || "Save failed.");
    }
  }

  return (
    <main className="container admin-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Plan B Admin</p>
          <h1>Smart RO<br />Content Control</h1>
          <p className="hero-text">
            This is the custom admin layer from Plan B. Appwrite handles login and cloud content;
            the site keeps a local fallback so development never gets blocked.
          </p>
        </div>
      </section>

      <section className="booking-shell">
        <form className="booking-form" onSubmit={signIn}>
          <h2>Admin Login</h2>
          {!canUseCloud && (
            <div className="quick-estimator">
              <h3>Cloud Setup Needed</h3>
              <p>Create `.env.local`, add your Appwrite project values, then run `npm run appwrite:setup`.</p>
            </div>
          )}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="btn" type="submit">Login With Appwrite</button>
          <p className="form-status">{canUseCloud ? "Cloud configuration detected." : "Cloud configuration pending."}</p>
        </form>

        <form className="booking-form" onSubmit={saveContent}>
          <h2>Site Content JSON</h2>
          <label htmlFor="content">Editable Content</label>
          <textarea
            id="content"
            rows="22"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            spellCheck="false"
          />
          <button className="btn" type="submit">Save Content</button>
          <p className="form-status">{status}</p>
        </form>
      </section>
    </main>
  );
}
