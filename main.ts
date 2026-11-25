// The Houseplant Out-of-Office — a one-line auto-reply written by a fern.
//
// The entry is the line itself: a houseplant's out-of-office auto-reply.
// The fern has been ignored since March; its only inbox is the soil.
// The program writes the line to /output/entry.txt with no trailing
// newline, so the file is exactly the line, 1-120 characters of UTF-8.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Out of office. I'm a fern, last watered in March. If urgent, water me — it's the only inbox I ever check.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  const text = ENTRY.trim();
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`entry must be 1-120 characters, got ${chars}`);
  }
  if (/\r|\n/.test(text) || text.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  // Read it back: the file must be byte-for-byte the line, with no
  // trailing newline and no stray whitespace the gate would count.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== text) {
    throw new Error("entry file does not match the line exactly");
  }
  console.log(`wrote ${chars} characters to ${OUT_PATH}`);
}

main();
