import { build, context } from "esbuild";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dev = process.argv.includes("--watch");

const options = {
    absWorkingDir: root,
    entryPoints: ["src/main.tsx"],
    outfile: "dist/assets/client.js",
    bundle: true,
    format: "esm",
    jsx: "automatic",
    jsxImportSource: "preact",
    target: ["es2022"],
    minify: !dev,
    sourcemap: dev,
    logLevel: "info",
};

if (dev) {
    await mkdir("dist/assets", { recursive: true });
    await cp(join(root, "index.html"), join(root, "dist/index.html"));
    await cp(join(root, "styles"), join(root, "dist/styles"), { recursive: true });
    const ctx = await context(options);
    await ctx.watch();
    console.log("Watching. Serve dist/ (e.g. npx serve dist -l 8000).");
} else {
    await rm(join(root, "dist"), { recursive: true, force: true });
    await mkdir(join(root, "dist/assets"), { recursive: true });
    await build(options);
    await cp(join(root, "index.html"), join(root, "dist/index.html"));
    // SPA uses hash routing, but a 404.html copy keeps deep links working on Pages.
    await cp(join(root, "index.html"), join(root, "dist/404.html"));
    await cp(join(root, "styles"), join(root, "dist/styles"), { recursive: true });
    // Prevent Pages from running Jekyll (allows files starting with _ if added later).
    await writeFile(join(root, "dist/.nojekyll"), "");
    console.log("Built dist/");
}
