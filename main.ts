import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Locate the artwork that ships beside this entrypoint.
const folder = dirname(fileURLToPath(import.meta.url));
const artwork = join(folder, "entry.png");

// Refuse to continue quietly when the artwork is absent.
if (!existsSync(artwork)) {
  console.error(`Missing source image: ${artwork}`);
  process.exit(1);
}

// The harness tells us where finished work belongs; fall back to /output.
const destinationFolder = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(destinationFolder, { recursive: true });

const destination = join(destinationFolder, "entry.png");
copyFileSync(artwork, destination);
console.log(`Wrote ${destination}`);
