import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    allowedHosts: [
      "f72414e5-3eb1-40ce-b904-8573c6353c4d-00-14j5ogzvwe4x3.sisko.repl.co",
    ],
  },
});
