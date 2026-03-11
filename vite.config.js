import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? "/marcedo-website/" : "/",
    plugins: [react(), svgr()],
    server: {
      port: 3000,
    },
  };
});
