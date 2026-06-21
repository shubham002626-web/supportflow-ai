# Deployment Instructions

SupportFlow AI is designed as a Full-Stack application using Vite as middleware.

## Deployment Target: Vercel (Recommended for Hackathon)
The easiest way to put this app in production is using Vercel to host the static assets and the Express API.

However, because this is an `express` + `vite` repository using middleware, Vercel needs a `vercel.json` rewrite configuration or we simply compile it. If compiling to a single Node container:

## Deployment Target: Google Cloud Run (Containerized Node.js)
Because our `package.json` has an internal production compilation flow (using `esbuild`), you can easily build it as a standard Dockerized Node app, which is optimal.

### Architecture
- **Client**: Bundled by `vite build` into `dist/`.
- **Server**: Express server bundled by `esbuild` into `dist/server.cjs`. 

### Steps
1. The start script is `node dist/server.cjs`.
2. Ensure you have the environment variables injected to the runtime.
   - `GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Execute `npm run build` during CI/CD.
4. Execute `npm start`.

### Checklist before Deploying
- [ ] Database schema is pushed to Supabase (`supabase/schema.sql`).
- [ ] Environment variables configured in your Hosting Provider.
- [ ] Tested API connection (Run `npm run build` locally, then `npm start`). 
- [ ] Ensure AI features return successfully without hitting rate limits.
