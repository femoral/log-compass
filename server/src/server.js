import express from "express";
import { createServer as createViteServer } from "vite";

export const createServer = async ({ logRouter }) => {
  const app = express();

  app.use("/api/logs", logRouter);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));
    app.get("*", (req, res) => {
      res.sendFile("client/dist/index.html", { root: __dirname });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  return app;
};
