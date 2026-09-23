import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DATA_FILE = path.join(process.cwd(), "invitation-data.json");

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint for Cloud Run
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  // API Route to fetch persistent invitation data
  app.get("/api/invitation-data", (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, "utf-8");
        return res.json(JSON.parse(content));
      }
    } catch (err) {
      console.error("Error reading invitation data:", err);
    }
    return res.json(null);
  });

  // API Route to save invitation data
  app.post("/api/invitation-data", (req, res) => {
    try {
      const data = req.body;
      if (data && typeof data === "object") {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
        return res.json({ success: true });
      }
      return res.status(400).json({ error: "Invalid data" });
    } catch (err) {
      console.error("Error saving invitation data:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
