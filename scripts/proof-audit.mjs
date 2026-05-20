import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "proof", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

for (const artifact of manifest.requiredArtifacts || []) {
  const filePath = path.join(root, artifact.path);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing proof artifact: ${artifact.path}`);
  }
  if (artifact.json) {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const key of artifact.requiredKeys || []) {
      if (!(key in parsed)) throw new Error(`${artifact.path} is missing key ${key}`);
    }
  }
  if (artifact.contains) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const snippet of artifact.contains) {
      if (!text.includes(snippet)) throw new Error(`${artifact.path} is missing expected text ${snippet}`);
    }
  }
}

const pinnedCli = packageJson.devDependencies?.["@topogram/cli"];
if (pinnedCli !== manifest.cliVersion) {
  throw new Error(`Expected @topogram/cli devDependency ${manifest.cliVersion}, got ${pinnedCli || "missing"}.`);
}

console.log("Proof audit passed.");
