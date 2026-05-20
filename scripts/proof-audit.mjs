import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "proof", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

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
}

if (!process.env.TOPOGRAM_CLI && manifest.cliVersion === "topogram-main-until-cli-patch") {
  throw new Error("TOPOGRAM_CLI must point at a Topogram checkout until this feature is published in @topogram/cli.");
}

console.log("Proof audit passed.");
