import { execSync } from "child_process";
import fs from "fs";

const root = process.env.VERCEL_PROJECT_ROOT;

if (!root) {
  console.log("No project root → skip");
  process.exit(0);
}
console.log("=== IGNORE BUILD SCRIPT START ===");
console.log("PWD:", process.cwd());
console.log("Files in cwd:", require("fs").readdirSync("."));
console.log("Files in scripts:", require("fs").readdirSync("scripts"));
console.log("=== IGNORE BUILD SCRIPT END ===");

// process.exit(0); // ✅ IMPORTANT

let files = [];

try {
  files = execSync("git diff --name-only HEAD~1")
    .toString()
    .split("\n")
    .filter(Boolean);
} catch {
  console.log("First deploy → force build");
  process.exit(1);
}

const shouldBuild = files.some(f => f.startsWith(root + "/"));

if (!shouldBuild) {
  console.log(`No changes in ${root} → skip`);
  process.exit(0);
}

console.log(`Changes in ${root} → deploy`);
process.exit(1);


