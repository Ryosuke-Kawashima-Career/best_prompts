/**
 * Skill Integrity & Verification Script
 * Validates YAML frontmatter, markdown structure, helper scripts, and test suite health.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("\n🔍 [Skill Modifier] Running Skill Verification & Health Check...\n");

const targetSkillPath = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(".agents/skills/skill-modifier");

if (!fs.existsSync(targetSkillPath)) {
  console.error(`❌ Target skill path not found: ${targetSkillPath}`);
  process.exit(1);
}

console.log(`📂 Inspecting Skill: ${path.basename(targetSkillPath)}`);

// 1. Check SKILL.md existence & YAML Frontmatter
const skillFile = path.join(targetSkillPath, "SKILL.md");
if (!fs.existsSync(skillFile)) {
  console.error("❌ Missing SKILL.md file!");
  process.exit(1);
}

const content = fs.readFileSync(skillFile, "utf-8");
const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

if (!frontmatterMatch) {
  console.error("❌ SKILL.md missing valid YAML frontmatter delimiters (---)!");
  process.exit(1);
}

const frontmatter = frontmatterMatch[1];
const hasName = /^name:\s*[\w-]+/m.test(frontmatter);
const hasDescription = /^description:\s*.+/m.test(frontmatter);

if (hasName && hasDescription) {
  console.log("✅ YAML Frontmatter valid (name & description present).");
} else {
  console.error("❌ YAML Frontmatter missing 'name' or 'description'!");
  process.exit(1);
}

// 2. Check JavaScript helper scripts syntax
const scriptsDir = path.join(targetSkillPath, "scripts");
if (fs.existsSync(scriptsDir)) {
  const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith(".js"));
  for (const script of scriptFiles) {
    const fullPath = path.join(scriptsDir, script);
    try {
      execSync(`node -c "${fullPath}"`, { stdio: "pipe" });
      console.log(`✅ Script syntax valid: scripts/${script}`);
    } catch (err) {
      console.error(`❌ Script syntax error in scripts/${script}`);
      process.exit(1);
    }
  }
}

// 3. Run workspace-wide step verification
console.log("\n⚡ Executing Workspace Test Runner...");
try {
  execSync("node .agents/skills/hackathon-rapid-builder/scripts/verify-step.js", { stdio: "inherit" });
  console.log("\n🎉 ALL SKILL CHECKS & WORKSPACE TESTS PASSED!\n");
  process.exit(0);
} catch (err) {
  console.error("\n❌ Workspace step verification failed.\n");
  process.exit(1);
}
