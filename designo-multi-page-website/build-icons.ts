// Copyright © 2023 Kent C. Dodds

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the “Software”), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import * as path from "node:path";
import { invariant } from "@epic-web/invariant";
import { $ } from "execa";
import fsExtra from "fs-extra";
import { glob } from "glob";
import { parse } from "node-html-parser";

const cwd = process.cwd();
const inputDir = path.join(cwd, "svg-icons");
const inputDirRelative = path.relative(cwd, inputDir);
const outputDir = path.join(cwd, "src", "app", "_components", "icons");
const outputDirSprite = path.join(cwd, "public");
await fsExtra.ensureDir(outputDir);

const files = glob
  .sync("**/*.svg", {
    cwd: inputDir,
  })
  .sort((a, b) => a.localeCompare(b));

const shouldVerboseLog = process.argv.includes("--log=verbose");
// eslint-disable-next-line @typescript-eslint/no-empty-function
const logVerbose = shouldVerboseLog ? console.log : () => {};

if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`);
} else {
  await generateIconFiles();
}

async function generateIconFiles() {
  const spriteFilepath = path.join(outputDirSprite, "sprite.svg");
  const typeOutputFilepath = path.join(outputDir, "name.d.ts");
  const currentSprite = await fsExtra
    .readFile(spriteFilepath, "utf8")
    .catch(() => "");
  const currentTypes = await fsExtra
    .readFile(typeOutputFilepath, "utf8")
    .catch(() => "");

  const iconNames = files.map((file) => iconName(file));

  const spriteUpToDate = iconNames.every((name) =>
    currentSprite.includes(`id=${name}`),
  );
  const typesUpToDate = iconNames.every((name) =>
    currentTypes.includes(`"${name}"`),
  );

  if (spriteUpToDate && typesUpToDate) {
    logVerbose(`Icons are up to date`);
    return;
  }

  logVerbose(`Generating sprite for ${inputDirRelative}`);

  const spriteChanged = await generateSvgSprite({
    files,
    inputDir,
    outputPath: spriteFilepath,
  });

  for (const file of files) {
    logVerbose("✅", file);
  }
  logVerbose(`Saved to ${path.relative(cwd, spriteFilepath)}`);

  const stringifiedIconNames = iconNames.map((name) => JSON.stringify(name));

  const typeOutputContent = `// This file is generated by npm run build:icons

export type IconName =
\t| ${stringifiedIconNames.join("\n\t| ")};
`;
  const typesChanged = await writeIfChanged(
    typeOutputFilepath,
    typeOutputContent,
  );

  logVerbose(`Manifest saved to ${path.relative(cwd, typeOutputFilepath)}`);

  const readmeChanged = await writeIfChanged(
    path.join(outputDir, "README.md"),
    `# Icons

This directory contains SVG icons that are used by the app.

Everything in this directory is generated by \`npm run build:icons\`.
`,
  );

  if (spriteChanged || typesChanged || readmeChanged) {
    console.log(`Generated ${files.length} icons`);
  }
}

function iconName(file: string) {
  return file.replace(/\.svg$/, "");
}

/**
 * Creates a single SVG file that contains all the icons
 */
async function generateSvgSprite({
  files,
  inputDir,
  outputPath,
}: {
  files: string[];
  inputDir: string;
  outputPath: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const input = await fsExtra.readFile(path.join(inputDir, file), "utf8");
      const root = parse(input);

      const svg = root.querySelector("svg");
      if (!svg) throw new Error("No SVG element found");

      if (!svg.hasAttribute("viewBox")) {
        const width = svg.getAttribute("width");
        const height = svg.getAttribute("height");
        invariant(
          typeof width === "string" && typeof height === "string",
          `SVG element in "${file}" is missing required attributes. Make sure it has either viewBox or width and height`,
        );

        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      svg.tagName = "symbol";
      svg.setAttribute("id", iconName(file));
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xmlns:xlink");
      svg.removeAttribute("version");
      svg.removeAttribute("width");
      svg.removeAttribute("height");

      return svg.toString().trim();
    }),
  );

  const output = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- This file is generated by npm run build:icons -->`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
    "", // trailing newline
  ].join("\n");

  return writeIfChanged(outputPath, output);
}

async function writeIfChanged(filepath: string, newContent: string) {
  const currentContent = await fsExtra
    .readFile(filepath, "utf8")
    .catch(() => "");
  if (currentContent === newContent) return false;
  await fsExtra.writeFile(filepath, newContent, "utf8");
  await $`prettier --write ${filepath} --ignore-unknown`;
  return true;
}
