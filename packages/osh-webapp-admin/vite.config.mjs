import react from "@vitejs/plugin-react";
import * as os from "node:os";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    cacheDir: os.tmpdir(),
    proxy: {
      "^/admin-api": {
        target: `${env.BACKEND_URL}`,
        secure: false,
      },
    },
  };
});
