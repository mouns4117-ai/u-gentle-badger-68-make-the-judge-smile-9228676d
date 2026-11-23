// SPDX-License-Identifier: MIT
// Make the Judge Smile — writes one line (1-200 characters) about a small
// good thing that happened today to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "This morning my neighbour left a tomato on my doorstep with a note: 'Yours grew better than mine.'";

function emptyDir(dir: string): void {
  // Empty only the directory's contents. The grader's /output is a mounted
  // empty directory, so the directory itself must never be removed.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The output directory is an optional argument so the program can be
  // exercised anywhere; the grader runs it with no arguments, so /output
  // is the default.
  const outDir = process.argv[2] ?? "/output";
  const text = ENTRY;
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (/\r|\n/.test(text) || text.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
