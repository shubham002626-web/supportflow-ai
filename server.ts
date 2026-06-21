import app from "./server/app";
import path from "path";
import { createServer as createViteServer } from "vite";

const PORT = Number(process.env.PORT) || 3002;

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(expressStatic(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// A small helper in case express is not imported in this scope
function expressStatic(distPath: string) {
  const express = require("express");
  return express.static(distPath);
}

startServer();
