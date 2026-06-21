# Environment Variables Documentation

To run SupportFlow AI, the following environment variables need to be configured safely.

### Client-side Variables (Vite)
These variables are exposed to the client bundle. Use them for public identifiers only.

- `VITE_SUPABASE_URL`: The URL of your Supabase project (Find in Project Settings > API).
- `VITE_SUPABASE_ANON_KEY`: The public anonymous key for Supabase, safe to expose.

### Server-side Variables (Backend)
These variables are confidential and **must never** be exposed to the browser.
They are only accessed inside `server/services` or API routes.

- `GEMINI_API_KEY`: Your Google Gemini API Key. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate it.
- `JWT_SECRET`: For optional backend session verifications.

---

### `.env` File Example
Create a `.env` file in the root directory:

```env
# Supabase (Public)
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGci..."

# Gemini AI (Secret - Do Not Prefix with VITE_)
GEMINI_API_KEY="AIzaSy..."
```
