import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [solidPlugin(), Icons()],
  server: {
    port: 3001,
  },
  root: "./client",
  build: {
    target: "esnext",
  },
});
