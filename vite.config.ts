import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [noBundlePlugin(), dts()],
    build: {
        lib: {
            name: "ts-dns-packet",
            entry: "src/index.ts",
            formats: ["es"],
        },
        rollupOptions: {
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
            },
        },
        sourcemap: true,
        outDir: "dist",
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
