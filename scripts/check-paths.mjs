import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const denied = [/\/Users\//, /\/private\/tmp\//, /\/private\/var\//, /\/home\//, /C:\/Users\//i];
const ignored = new Set([".git", "node_modules"]);

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile()) files.push(full);
  }
  return files;
}

const leaks = [];
for (const file of walk(root)) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of denied) {
    if (pattern.test(text)) leaks.push(relative);
  }
}

if (leaks.length) {
  console.error(`Local absolute paths found in ${leaks.join(", ")}`);
  process.exit(1);
}

console.log("Path hygiene passed.");
