"use client";

import { useMemo, useState, useEffect } from "react";
import { getBrowserAppwrite, appwriteReady } from "../../lib/appwrite-browser";
import { fallbackContent } from "../../lib/site-content";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_SITE_CONTENT_COLLECTION_ID || process.env.APPWRITE_SITE_CONTENT_COLLECTION_ID;
const documentId = process.env.NEXT_PUBLIC_APPWRITE_SITE_CONTENT_DOCUMENT_ID || process.env.APPWRITE_SITE_CONTENT_DOCUMENT_ID || "smart-ro";
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "smart_ro_images";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contentObj, setContentObj] = useState(fallbackContent);
  const [status, setStatus] = useState("Local editor ready.");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true); // check session on mount

  const appwrite = useMemo(() => getBrowserAppwrite(), []);
  const canUseCloud = appwriteReady && databaseId && collectionId && appwrite;

  useEffect(() => {
    if (canUseCloud) {
      appwrite.account.get()
        .then(() => {
          setSignedIn(true);
          loadContent();
        })
        .catch(() => {
          setSignedIn(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseCloud, appwrite]);

  async function loadContent() {
    try {
      const document = await appwrite.databases.getDocument(databaseId, collectionId, documentId);
      if (document.content) {
        setContentObj(JSON.parse(document.content));
      }
      setStatus("Cloud content loaded successfully.");
    } catch(error) {
      setStatus("Failed to load cloud content: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("Signing in...");
    
    try {
      try {
        await appwrite.account.createEmailPasswordSession(email, password);
      } catch (err) {
        if (!err.message.includes('prohibited when a session is active')) {
          throw err;
        }
      }
      setSignedIn(true);
      await loadContent();
    } catch (error) {
      console.error(error);
      setStatus("Login failed: " + error.message);
      setLoading(false);
    }
  }

  async function saveContent(event) {
    event.preventDefault();
    if (!signedIn) {
      setStatus("You must be signed in to save.");
      return;
    }

    setLoading(true);
    setStatus("Saving to cloud...");
    try {
      await appwrite.databases.updateDocument(databaseId, collectionId, documentId, { 
        content: JSON.stringify(contentObj) 
      });
      setStatus("✅ Saved successfully! It will go live shortly.");
    } catch (error) {
      setStatus("Save failed: " + error.message);
    }
    setLoading(false);
  }

  const handleImageUpload = async (event, arrayCategory, index, fieldName) => {
    const file = event.target.files[0];
    if (!file || !signedIn) return;

    setStatus("Uploading image...");
    setLoading(true);

    try {
      const response = await appwrite.storage.createFile(
        bucketId,
        appwrite.ID.unique(),
        file
      );

      // Construct public URL
      const fileUrl = `${appwrite.client.config.endpoint}/storage/buckets/${bucketId}/files/${response.$id}/view?project=${appwrite.client.config.project}`;
      
      handleArrayChange(arrayCategory, index, fieldName, fileUrl);
      setStatus("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Image upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessChange = (field, value) => {
    setContentObj(prev => ({ ...prev, business: { ...prev.business, [field]: value } }));
  };

  const handleArrayChange = (category, index, field, value) => {
    setContentObj(prev => {
      const newArray = [...prev[category]];
      if (field) { newArray[index] = { ...newArray[index], [field]: value }; }
      else { newArray[index] = value; }
      return { ...prev, [category]: newArray };
    });
  };

  if (loading && !signedIn) return <main className="container admin-shell"><h2>Checking login session...</h2></main>;

  if (!signedIn) {
    return (
      <main className="container admin-shell">
        <section className="hero">
          <div className="hero-copy">
            <h1>Admin Panel</h1>
            <p>Log in with your Appwrite admin credentials to edit website content.</p>
          </div>
        </section>
        <section className="booking-shell">
          <form className="booking-form" onSubmit={signIn}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Secure Login"}
            </button>
            <p className="form-status" style={{ color: 'var(--brand)' }}>{status}</p>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container admin-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Dashboard</p>
          <h1>Content Manager</h1>
          <p>Edit your website content below using the graphical interface.</p>
        </div>
      </section>

      <section className="admin-editor">
        <div className="editor-actions">
          <p className="form-status" style={{ fontWeight: 'bold', color: 'green', flex: 1 }}>{status}</p>
          <button className="btn" onClick={saveContent} disabled={loading}>
            {loading ? "Saving..." : "Save All Changes"}
          </button>
        </div>

        <div className="editor-group-grid">
          <div className="editor-card">
            <h2>Business Details</h2>
            <label>Business Name</label>
            <input type="text" value={contentObj.business.name} onChange={e => handleBusinessChange("name", e.target.value)} />
            <label>Tagline</label>
            <input type="text" value={contentObj.business.tagline} onChange={e => handleBusinessChange("tagline", e.target.value)} />
            <label>Description</label>
            <textarea rows="3" value={contentObj.business.description} onChange={e => handleBusinessChange("description", e.target.value)} />
            <label>Location / Address</label>
            <input type="text" value={contentObj.business.location} onChange={e => handleBusinessChange("location", e.target.value)} />
            <label>Contact Phone 1</label>
            <input type="text" value={contentObj.business.phones[0]} onChange={e => handleArrayChange("business.phones", 0, null, e.target.value)} />
            <label>Contact Phone 2</label>
            <input type="text" value={contentObj.business.phones[1]} onChange={e => handleArrayChange("business.phones", 1, null, e.target.value)} />
          </div>

          <div className="editor-card">
            <h2>Our Services</h2>
            {contentObj.services.map((svc, i) => (
              <div key={i} className="editor-item">
                <input type="text" placeholder="Service Title" value={svc.title} onChange={e => handleArrayChange("services", i, "title", e.target.value)} />
                <textarea rows="2" placeholder="Service Description" value={svc.description} onChange={e => handleArrayChange("services", i, "description", e.target.value)} />
              </div>
            ))}
          </div>

          <div className="editor-card">
            <h2>Products & Models</h2>
            {contentObj.products.map((prod, i) => (
              <div key={i} className="editor-item">
                <input type="text" placeholder="Product Name" value={prod.title} onChange={e => handleArrayChange("products", i, "title", e.target.value)} />
                <input type="text" placeholder="Brand Category (e.g. kent, aquaguard)" value={prod.brand} onChange={e => handleArrayChange("products", i, "brand", e.target.value)} />
                <textarea rows="2" placeholder="Product Description" value={prod.description} onChange={e => handleArrayChange("products", i, "description", e.target.value)} />
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#666', display: 'block', marginBottom: '5px' }}>Product Image</label>
                  {prod.image && prod.image.startsWith('http') && (
                    <img src={prod.image} alt={prod.title} style={{ height: '60px', objectFit: 'contain', display: 'block', marginBottom: '10px', borderRadius: '4px' }} />
                  )}
                  <input 
                    type="text" 
                    placeholder="Image URL (Upload or paste link)" 
                    value={prod.image || ''} 
                    onChange={e => handleArrayChange("products", i, "image", e.target.value)}
                    style={{ marginBottom: '8px' }}
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleImageUpload(e, "products", i, "image")}
                    disabled={loading}
                    style={{ display: 'block', width: '100%', padding: '8px', background: '#f9f9f9', border: '1px dashed #ccc' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="editor-card">
            <h2>Frequently Asked Questions</h2>
            {contentObj.faqs.map((faq, i) => (
              <div key={i} className="editor-item">
                <input type="text" placeholder="Question" value={faq.question} onChange={e => handleArrayChange("faqs", i, "question", e.target.value)} />
                <textarea rows="2" placeholder="Answer" value={faq.answer} onChange={e => handleArrayChange("faqs", i, "answer", e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .admin-shell { padding: 40px; max-width: 1000px; margin: 0 auto; }
        .admin-editor { padding: 20px 0; }
        .editor-actions { display: flex; align-items: center; justify-content: space-between; background: #fff; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 30px; position: sticky; top: 20px; z-index: 100; border: 1px solid #eaeaea; }
        .editor-group-grid { display: grid; gap: 30px; grid-template-columns: 1fr; }
        .editor-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #eaeaea; }
        .editor-card h2 { margin-top: 0; margin-bottom: 25px; color: var(--text-dark); border-bottom: 2px solid #f4f4f4; padding-bottom: 10px; font-size: 1.5rem; }
        .editor-card label { display: block; font-weight: 600; margin: 15px 0 8px; color: #444; font-size: 0.95rem; }
        .editor-card input, .editor-card textarea { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 10px; font-family: inherit; font-size: 1rem; transition: border 0.2s; }
        .editor-card input:focus, .editor-card textarea:focus { border-color: var(--brand); outline: none; }
        .editor-item { border-left: 4px solid var(--brand); margin-bottom: 25px; background: #fdfdfd; padding: 20px; border-radius: 0 8px 8px 0; }
        .form-status { font-weight: 500; font-size: 1rem; margin: 0; }
      `}} />
    </main>
  );
}