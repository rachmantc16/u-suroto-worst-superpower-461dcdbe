import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a power that sounds handy for half a second, then collapses.
// Invisibility is a classic — unless it only switches on in the one set of
// conditions where being unseen is already guaranteed: alone, locked in,
// windowless, and in total darkness. Revised wording adds "windowless"
// and "already off" stacking so the limitation feels airtight, not vague.
const LINE =
  "I can turn invisible at will, but only when I'm completely alone in a locked, windowless room with the lights already off.";

function validate(line: string): void {
  if (typeof line !== "string") {
    throw new Error("entry must be a string");
  }
  // Count Unicode code points, not UTF-16 code units, so the 140-character
  // gate matches what a reader (and the judge) would count.
  const charCount = Array.from(line).length;
  if (charCount < 1 || charCount > 140) {
    throw new Error(`entry must be 1-140 characters, got ${charCount}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main(): void {
  validate(LINE);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  // Write exactly the line — no trailing newline.
  writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
}

main();
