import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/generate-recipe-page.mjs <input.txt> <output.html>');
}

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const text = await readFile(inputPath, 'utf8');
const sections = {};
let sectionName;

for (const line of text.split(/\r?\n/)) {
  const heading = line.match(/^\s*\[([^\]]+)]\s*$/);
  if (heading) {
    sectionName = heading[1];
    sections[sectionName] = [];
  } else if (sectionName && line.trim() && !line.trimStart().startsWith(';')) {
    sections[sectionName].push(line.trim());
  }
}

const title = sections.Titol?.join(' ') || 'Recepta sense títol';
const ingredients = (sections.Ingredients || [])
  .map((line) => line.split(/\s*=\s*/, 2)[1] || line)
  .map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`)
  .join('\n');
const method = (sections.Elaboracio || [])
  .map((step) => `<li>${escapeHtml(step)}</li>`)
  .join('\n');
const category = (sections.Categories || [])
  .find((line) => /^\s*categoria\s*=/i.test(line))
  ?.split(/\s*=\s*/, 2)[1];

const page = `<!doctype html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Receptes casolanes</title>
  <style>
    body { max-width: 48rem; margin: 0 auto; padding: 2rem 1rem; color: #27251f; background: #faf8f0; font: 1.125rem/1.55 Georgia, serif; }
    a { color: #5f5302; } h1, h2 { line-height: 1.2; } .category { color: #5f5302; font-weight: bold; }
  </style>
</head>
<body>
  <p><a href="/">Tornar a les receptes</a></p>
  ${category ? `<p class="category">${escapeHtml(category)}</p>` : ''}
  <h1>${escapeHtml(title)}</h1>
  <h2>Ingredients</h2>
  <ul>${ingredients}</ul>
  <h2>Elaboració</h2>
  <ol>${method}</ol>
</body>
</html>
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, page);