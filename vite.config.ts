import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Disable Lovable's Nitro (Cloudflare/Node) output: Netlify's plugin builds the deploy instead.
  nitro: false,
  plugins: [tsconfigPaths(), netlify()],
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
