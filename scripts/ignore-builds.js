import { execSync } from "child_process";

const root = process.env.VERCEL_PROJECT_ROOT;

if (!root) {
  console.log("No project root → skip");
  process.exit(0);
}

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
