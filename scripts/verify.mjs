import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = process.env.TOPOGRAM_CLI
  ? path.resolve(process.env.TOPOGRAM_CLI)
  : path.join(root, "node_modules", "@topogram", "cli", "src", "cli.js");

function run(command, args, options = {}) {
  const result = childProcess.spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20,
    ...options
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stderr || result.stdout}`);
  }
  return result.stdout;
}

function runCli(args) {
  return run(process.execPath, [cliPath, ...args]);
}

if (!fs.existsSync(cliPath)) {
  throw new Error("Install the pinned @topogram/cli devDependency or set TOPOGRAM_CLI=/path/to/topogram/engine/src/cli.js for local development.");
}

run(process.execPath, ["./scripts/check-paths.mjs"]);
runCli(["check", ".", "--json"]);

const coverage = JSON.parse(runCli(["query", "ui-design-coverage", "./topo", "--projection", "proj_web_surface", "--json"]));
if (coverage.summary.design_realization_sets < 1 || coverage.summary.widget_realizations < 2) {
  throw new Error("Design coverage did not include the expected realization set.");
}
fs.writeFileSync(path.join(root, "proof", "artifacts", "ui-design-coverage.json"), `${JSON.stringify(coverage, null, 2)}\n`);

const realization = JSON.parse(runCli(["emit", "ui-realization-report", "./topo", "--projection", "proj_web_surface", "--json"]));
if (realization.summary.design_realization_sets < 1 || realization.summary.design_realization_components < 2) {
  throw new Error("UI realization report did not include expected design mapping.");
}
fs.writeFileSync(path.join(root, "proof", "artifacts", "ui-realization-report.json"), `${JSON.stringify(realization, null, 2)}\n`);

const slice = JSON.parse(runCli(["query", "slice", "./topo", "--widget", "widget_data_grid", "--detail", "compact", "--json"]));
if (slice.focus?.id !== "widget_data_grid" || slice.ui_agent_packet?.designContracts?.status !== "mapped") {
  throw new Error("Widget slice did not include mapped design contract context.");
}
fs.writeFileSync(path.join(root, "proof", "artifacts", "widget-slice.json"), `${JSON.stringify(slice, null, 2)}\n`);

run(process.execPath, ["./scripts/proof-audit.mjs"]);

const status = run("git", ["status", "--short"]).trim();
if (status) {
  throw new Error(`Working tree is not clean:\n${status}`);
}

console.log("Proof verification passed.");
