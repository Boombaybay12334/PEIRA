import { spawn } from "node:child_process";
import process from "node:process";

import { formatError, usage } from "./author-utils.mjs";

export const checks = ["check:placeholders", "lint", "check", "test", "build", "essay:status"];

export function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${command} failed`))));
  });
}

export async function runChecks(slug) {
  for (const script of checks) {
    const args = [script];
    if (slug && script === "essay:status") args.push(slug);
    await runCommand("pnpm", args);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.length > 3) {
    console.error(usage("pnpm essay:check", "[slug]"));
    process.exitCode = 1;
  } else {
    try {
      await runChecks(process.argv[2]);
      console.log("PASS: essay checks completed.");
    } catch (error) {
      console.error(`FAIL: ${formatError(error)}`);
      process.exitCode = 1;
    }
  }
}
