import { execSync } from "child_process";
import fs from "fs";

const root = process.env.VERCEL_PROJECT_ROOT;

console.log("=== IGNORE BUILD SCRIPT START ===");
console.log("PWD:", process.cwd());
console.log("Root files:", fs.readdirSync("."));
console.log("Scripts files:", fs.readdirSync("scripts"));

if (!root) {
  console.log("No VERCEL_PROJECT_ROOT set → allow build");
  process.exit(0);
}

let files = [];

try {
  files = execSync("git diff --name-only HEAD~1")
    .toString()
    .split("\n")
    .filter(Boolean);
} catch {
  console.log("First deploy (no git history) → allow build");
  process.exit(0);
}

const shouldDeploy = files.some(f => f.startsWith(root + "/"));

if (!shouldDeploy) {
  console.log(`No changes in ${root} → skipping deploy`);
  process.exit(0); // ✅ SUCCESS = skip silently
}

console.log(`Changes in ${root} → allow deploy`);
console.log("=== IGNORE BUILD SCRIPT END ===");

// 🔥 THIS IS THE MOST IMPORTANT LINE
process.exit(0);
