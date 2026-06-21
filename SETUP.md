# Setup Guide

This document outlines the step-by-step process of getting SupportFlow AI up and running locally.

## Prerequisite configurations

### 1. Supabase Initialization
1. Create a new Supabase project at [Supabase Dashboard](https://database.new)
2. Go to the SQL Editor in your Supabase dashboard.
3. Paste the contents of `supabase/schema.sql` (found in the root folder of this project) to create:
   - Tables (`users`, `tickets`, `ticket_categories`, `sentiment_logs`, etc.)
   - Types and Enums
4. Set up Row Level Security (RLS) rules depending on your deployment scenario if needed.
5. Grab your **Project URL** and **Anon Key** from `Settings -> API`.

### 2. Google Gemini API Setup
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Generate an API Key.
3. Keep this key secure.

## Local Installation

1. Clone or download the repository.
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Configure the environment variables according to `ENVIRONMENT.md`.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Navigating to `http://localhost:3000` will show you the full-stack App. The API endpoints run at `/api/*`.

## Database Migration Script Overview

For iterative changes to our schema, use Supabase CLI to create new migrations:
```bash
npx supabase init
npx supabase migration new my_feature
```
All schema rules reside in `supabase/schema.sql` initially for the hackathon MVP.
