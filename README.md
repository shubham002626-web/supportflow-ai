# SupportFlow AI

**An AI-First Customer Support Resolution Engine.**

SupportFlow AI is an autonomous, scalable, and multilingual customer support solution built to augment and automate ticket resolution, analytics, and knowledge management for modern enterprises.

## Features

- **Autonomous Resolution**: AI automatically parses incoming tickets, determines priority and sentiment, and suggests resolutions.
- **Multilingual Support**: Supports English, Hindi, Bengali, Tamil, and Marathi naturally.
- **Voice Capabilities**: Native browser speech-to-text input and AI text-to-speech output.
- **Knowledge Base Integration**: Dynamically index your PDFs, DOCX, and text guides so the AI can retrieve business-specific rules.
- **Enterprise Analytics**: Comprehensive dashboard showing AI resolution rate vs. Human resolution rate, sentiment analytics over time, and action hubs for negative sentiment tickets.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend API**: Express router integrated via Vite middleware for full-stack deployment
- **AI Brain**: Google Gemini 2.5 Flash via `@google/genai` TypeScript SDK
- **Database/Auth**: Supabase (PostgreSQL, Row Level Security)
- **Deployment**: Vercel ready (static client + serverless functions or containerized Cloud Run)

## Getting Started

Please see the [SETUP.md](./SETUP.md) for local installation guide.
Please see the [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployments.
