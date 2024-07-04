#!/usr/bin/env node
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

const esbuildCommon = {
    entryPoints: ["src/index.js"],
    platform: "node",
    target: ["node18"],
    plugins: [sveltePlugin({compilerOptions: {css: "injected"}})],
    bundle: true,
};

(async function () {
    //start esbuild processes
    let esm = esbuild.build({
        format: "esm",
        outfile: "./lib/index.mjs",
        ...esbuildCommon,
    });

    let cjs = esbuild.build({
        format: "cjs",
        outfile: "./lib/index.js",
        ...esbuildCommon,
    });


    //wait for esbuild to finish both versions
    await esm;
    await cjs;
})().catch((err) => {
    console.error("ERROR", err.stack || err);
    process.exit(1);
});