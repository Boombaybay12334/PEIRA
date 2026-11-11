import { networkInterfaces } from "node:os";
import { spawn } from "node:child_process";
import process from "node:process";

import { formatError, usage } from "./author-utils.mjs";

export function lanHosts() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => entry.address);
}

export function previewUrls(slug, hosts = lanHosts(), port = 4321) {
  const path = slug ? `/essays/${slug}/` : "/";
  return hosts.map((host) => `http://${host}:${port}${path}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.length > 3) {
    console.error(usage("pnpm preview:phone", "[slug]"));
    process.exitCode = 1;
  } else {
    try {
      const slug = process.argv[2];
      const hosts = lanHosts();
      console.log(`Home: ${previewUrls(undefined, hosts).join(", ") || "no LAN IPv4 address found"}`);
      console.log(
        `Essay: ${previewUrls(slug, hosts).join(", ") || "no LAN IPv4 address found"}`,
      );
      const child = spawn("pnpm", ["dev", "--host"], { stdio: "inherit" });
      child.on("exit", (code) => {
        process.exitCode = code ?? 1;
      });
    } catch (error) {
      console.error(`preview:phone failed: ${formatError(error)}`);
      process.exitCode = 1;
    }
  }
}
