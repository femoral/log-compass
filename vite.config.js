import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";
import { VitePluginFonts } from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Icons({ compiler: "solid" }),
    VitePluginFonts({
      google: {
        families: ["JetBrains Mono", "Roboto"],
      },
    }),
  ],
  server: {
    port: 3001,
  },
  root: "./client",
  build: {
    target: "esnext",
  },
});
