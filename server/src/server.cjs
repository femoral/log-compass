const express = require("express");
const path = require("path");

const moduleRoot = path.join(
  __dirname,
  "..",
  ".."
);

const createServer = async ({ logRouter }) => {
  const app = express();

  app.use("/api/logs", logRouter);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(moduleRoot, "client", "dist")));
    app.get("*", (req, res) => {
      res.sendFile("client/dist/index.html", { root: moduleRoot });
    });
  } else {
    const { createServer: createViteServer } =  require("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  return app;
};

module.exports = {
  createServer,
}