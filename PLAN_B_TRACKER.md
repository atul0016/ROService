# Smart RO Plan B Tracker

Last updated: 2026-05-04

## Goal

Rebuild the existing Smart RO Service Center website as a world-class local Plan B project:

- Next.js frontend
- Appwrite CMS/auth backend
- Admin panel for client content edits
- Vercel-ready deployment later
- Existing frontend look preserved unless explicitly changed

## Current Local Status

- Local project path: `D:\CUSTOMS\Harshit\Website`
- Local dev URL: `http://127.0.0.1:3001/`
- Local admin URL: `http://127.0.0.1:3001/admin`
- Deployment: not started yet
- Appwrite account: already created by user
- Appwrite backend setup: pending credentials/API access
- Playwright MCP browser: not exposed to Codex session yet

## Done

### Project Conversion

- Added Next.js project structure:
  - `app/layout.jsx`
  - `app/page.jsx`
  - `app/admin/page.jsx`
  - `lib/site-content.js`
  - `lib/appwrite-server.js`
  - `lib/appwrite-browser.js`
  - `scripts/setup-appwrite.mjs`
- Added package setup:
  - `package.json`
  - `package-lock.json`
  - `next.config.mjs`
- Copied existing assets into `public/` so Next.js can serve them.
- Copied existing CSS into `app/globals.css`.
- Preserved the current frontend visual style.

### Plan B Frontend

- Homepage now renders from structured content instead of hardcoded static HTML.
- Homepage has `revalidate = 60`, matching Plan B content refresh behavior.
- Site works locally even without Appwrite by using fallback content.
- Existing business content included:
  - Smart RO Service Center
  - phones: `9931672157`, `9931075913`
  - location: Maharajganj Bazaar, Jamui
  - RO services/products/FAQ/testimonials/contact

### Admin Panel

- Added `/admin`.
- Admin supports:
  - Appwrite login flow
  - JSON content editor
  - Appwrite document loading
  - Appwrite document saving
  - local fallback message when cloud env is missing
- Added setup notice in admin when Appwrite env values are not configured.

### Appwrite Automation

- Added `scripts/setup-appwrite.mjs`.
- Added command:

```powershell
npm run appwrite:setup
```

- Script can create/seed:
  - database
  - collection
  - large `content` string attribute
  - seed document with current site content
  - optional Appwrite admin user

### Env Template

- Added `.env.example`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_SITE_CONTENT_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_SITE_CONTENT_DOCUMENT_ID=smart-ro
APPWRITE_API_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_SITE_CONTENT_COLLECTION_ID=
APPWRITE_SITE_CONTENT_DOCUMENT_ID=smart-ro
APPWRITE_ADMIN_EMAIL=
APPWRITE_ADMIN_PASSWORD=
```

### Verification

- `npm install` completed.
- Dependencies upgraded to secure current line:
  - Next.js `16.2.4`
  - React `19.2.0`
  - React DOM `19.2.0`
- Added PostCSS override.
- `npm audit --omit=dev` result: `0 vulnerabilities`.
- `npm run build` passes.
- Local route checks passed:
  - `/` returned `200 OK`
  - `/admin` returned `200 OK`

### Git Hygiene

- Updated `.gitignore` for Next.js:
  - `node_modules/`
  - `.next/`
  - `out/`
  - `.env.local`
  - `.env*.local`
  - `npm-debug.log*`

## Blocked / Waiting

### Appwrite Credentials Needed

Need these values from Appwrite:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_ADMIN_EMAIL=
APPWRITE_ADMIN_PASSWORD=
```

The API key needs permissions for:

- Databases
- Collections
- Attributes
- Documents
- Users

Optional fixed IDs if user wants custom names:

```env
APPWRITE_DATABASE_ID=smart_ro_cms
APPWRITE_SITE_CONTENT_COLLECTION_ID=site_content
APPWRITE_SITE_CONTENT_DOCUMENT_ID=smart-ro
```

### Playwright MCP Browser

User says Playwright MCP is working, but Codex currently cannot access it.

Checks already done:

- `list_mcp_resources` returned empty
- `list_mcp_resource_templates` returned empty
- `C:\Users\atulh\.codex\config.toml` shows GitHub plugin only
- No Playwright MCP server exposed in this Codex session

Need a Codex/session reload or MCP registration so browser tools appear as callable tools/resources.

## Next Steps

### Immediate Next Step

Create `.env.local` with Appwrite values.

Then run:

```powershell
npm run appwrite:setup
```

Expected result:

- Appwrite database created
- Appwrite collection created
- `content` attribute created
- `smart-ro` content document seeded
- admin user created if email/password are provided

Then restart dev server:

```powershell
npm run dev
```

Then test:

- Open `http://127.0.0.1:3001/admin`
- Login with Appwrite admin email/password
- Edit JSON
- Save
- Open `http://127.0.0.1:3001/`
- Confirm content refreshes after about 60 seconds

### After Appwrite Works

Replace raw JSON admin with polished field-based admin:

- Business info editor
- Hero section editor
- Services editor
- Products editor
- FAQ editor
- Testimonials editor
- Contact details editor
- Image upload support through Appwrite Storage
- Save/publish states
- Validation and error messages

### Later Deployment

Only after local system is solid:

- Push repo to GitHub
- Import into Vercel
- Add env vars in Vercel
- Deploy production
- Connect custom domain
- Verify Appwrite CORS/platform settings for production domain

## Useful Commands

Install dependencies:

```powershell
npm install
```

Run local dev server:

```powershell
npm run dev
```

Build:

```powershell
npm run build
```

Audit production dependencies:

```powershell
npm audit --omit=dev
```

Setup Appwrite:

```powershell
npm run appwrite:setup
```

Check git status:

```powershell
git -c safe.directory=D:/CUSTOMS/Harshit/Website status --short
```

## Notes

- `web-solution-guide.html` is the original planning guide and remains available.
- `index.html`, `style.css`, and `script.js` are the old static site files.
- The current Plan B app lives in the Next.js `app/`, `lib/`, `public/`, and `scripts/` folders.
- Do not deploy until local Appwrite/admin flow is tested.
