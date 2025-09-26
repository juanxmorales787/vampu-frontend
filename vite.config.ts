// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { fileURLToPath } from "node:url";

// Absolute path to our stub so it works locally and on Vercel
const irysStub = fileURLToPath(new URL("./src/shims/irys-empty.ts", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({ protocolImports: true }),
  ],
  resolve: {
    alias: [
      { find: "stream", replacement: "stream-browserify" },
      { find: "buffer", replacement: "buffer" },
      { find: "process", replacement: "process/browser" },
      { find: "util", replacement: "util" },
      { find: "events", replacement: "events" },
      // Match @irys/query AND any subpath like @irys/query/build/esm/...
      { find: /^@irys\/query(?:\/.*)?$/, replacement: irysStub },
    ],
  },
  define: {
    global: "window",
    "process.env": {},
  },
  optimizeDeps: {
    include: ["buffer", "process", "stream-browserify", "util", "events"],
  },
});

