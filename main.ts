// The Agent's Uh-Oh — the one word an agent blurts when it has no idea
// what to do. Not a shrug, not an error code: the honest admission of a
// machine caught mid-task, hallucinating its way forward. Writes
// /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { TextEncoder } from "node:util";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 99;

// One word, no punctuation, no caption: the stall itself, named.
// An agent that says it out loud is at least honest about being lost.
const WORD = "Hallucinating";

const encoder = new TextEncoder();
const bytes = encoder.encode(`${WORD}\n`);
const length = [...WORD].length;

if (length < 1 || length > LIMIT) {
  throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word");
}
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error("entry must be plain letters, nothing attached");
}

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(join(OUTPUT_DIR, "entry.txt"), bytes);
console.log(`${length} chars, ${bytes.length} bytes -> ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(WORD);
