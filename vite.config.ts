import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            name: "ts-dns-packet",
            entry: "src/index.ts",
            formats: ["es"],
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true,
    },
});
