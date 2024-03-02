import { mergeConfig } from "vite";
import  baseConfig from "./vite.config"
import { defineConfig } from "vite";

export default mergeConfig(baseConfig, defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://api:3000"
      }
    }
  }
  })
)
