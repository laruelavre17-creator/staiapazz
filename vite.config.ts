import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  tanstackStart: {
    server: {
      entry: "server",
    },
    nitro: {
      preset: "node-server",
    },
  },
});
