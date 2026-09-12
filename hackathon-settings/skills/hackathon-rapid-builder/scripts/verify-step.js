/**
 * Universal Hackathon Rapid Step Verifier Script
 * Auto-detects the project language/ecosystem (Node.js/TypeScript, Python, Rust, Go, Java/Gradle/Maven)
 * and executes test suite, linter, and type checker sequentially with clean exit code handling.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("\n⚡ [Hackathon Rapid Builder] Running Multi-Language Step Verification...\n");

function runCommand(name, cmd) {
  process.stdout.write(`⏳ Checking ${name} [${cmd}]... `);
  try {
    execSync(cmd, { stdio: "pipe" });
    console.log("✅ PASS");
    return true;
  } catch (err) {
    console.log("❌ FAIL");
    if (err.stdout) console.log(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    return false;
  }
}

// Detect language ecosystem based on workspace indicator files
const cwd = process.cwd();
let checks = [];

if (fs.existsSync(path.join(cwd, "Cargo.toml"))) {
  console.log("📦 Detected Ecosystem: Rust (Cargo)");
  checks = [
    { name: "Unit & Integration Tests", cmd: "cargo test" },
    { name: "Clippy Linter", cmd: "cargo clippy -- -D warnings" },
    { name: "Type & Borrow Checker", cmd: "cargo check" }
  ];
} else if (fs.existsSync(path.join(cwd, "pyproject.toml")) || fs.existsSync(path.join(cwd, "requirements.txt")) || fs.existsSync(path.join(cwd, "Pipfile"))) {
  console.log("📦 Detected Ecosystem: Python");
  checks = [
    { name: "Pytest Suite", cmd: "pytest" },
    { name: "Linter (Ruff/Flake8)", cmd: "ruff check . || flake8" },
    { name: "Type Checker (Mypy)", cmd: "mypy ." }
  ];
} else if (fs.existsSync(path.join(cwd, "build.gradle")) || fs.existsSync(path.join(cwd, "build.gradle.kts"))) {
  console.log("📦 Detected Ecosystem: Java/Kotlin (Gradle)");
  const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
  checks = [
    { name: "Gradle Tests", cmd: `${gradlew} test` },
    { name: "Gradle Check", cmd: `${gradlew} check` }
  ];
} else if (fs.existsSync(path.join(cwd, "pom.xml"))) {
  console.log("📦 Detected Ecosystem: Java (Maven)");
  checks = [
    { name: "Maven Test Suite", cmd: "mvn test" },
    { name: "Maven Verification", cmd: "mvn verify -DskipTests" }
  ];
} else if (fs.existsSync(path.join(cwd, "go.mod"))) {
  console.log("📦 Detected Ecosystem: Go");
  checks = [
    { name: "Go Tests", cmd: "go test ./..." },
    { name: "Go Vet", cmd: "go vet ./..." }
  ];
} else if (fs.existsSync(path.join(cwd, "package.json"))) {
  console.log("📦 Detected Ecosystem: Node.js / TypeScript");
  checks = [
    { name: "Unit Tests", cmd: "npm test" },
    { name: "ESLint", cmd: "npm run lint" },
    { name: "TypeScript", cmd: "npm run typecheck" }
  ];
} else {
  console.warn("⚠️ No standard project descriptor found. Defaulting to npm checks.");
  checks = [
    { name: "Unit Tests", cmd: "npm test" }
  ];
}

let allPassed = true;
for (const check of checks) {
  const passed = runCommand(check.name, check.cmd);
  if (!passed) {
    allPassed = false;
    break;
  }
}

if (allPassed) {
  console.log("\n🎉 ALL CHECKS PASSED! Step verification complete.\n");
  process.exit(0);
} else {
  console.error("\n⚠️ Verification failed. Please resolve the errors above.\n");
  process.exit(1);
}
