const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const scriptTag = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
const srcAttr = /\bsrc\s*=\s*["']([^"']+)["']/;

const assets = [];
const utils = [];
const scenes = [];
const inline = [];

let match;
while ((match = scriptTag.exec(html)) !== null) {
  const [, attrs, body] = match;
  const src = (attrs.match(srcAttr) || [])[1];

  if (src) {
    if (src === '/assets.js') assets.push(src);
    else if (src.startsWith('/utils/')) utils.push(src);
    else if (src.startsWith('/scenes/')) scenes.push(src);
  } else if (body.trim()) {
    inline.push(body.trim());
  }
}

const ordered = [...assets, ...utils, ...scenes];

const parts = [];

for (const src of ordered) {
  const file = path.join(root, src);
  const code = fs.readFileSync(file, 'utf8').replace(/\s*$/, '');
  parts.push(`// ===== ${src.replace(/^\//, '')} =====\n${code}\n`);
}

for (const code of inline) {
  parts.push(`// ===== index.html (body) =====\n${code}\n`);
}

const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.js'), parts.join('\n'));

console.log(
  `Bundled ${ordered.length} files + ${inline.length} inline script(s) -> dist/index.js`,
);
console.log('  assets: ' + assets.join(', '));
console.log('  utils:  ' + utils.join(', '));
console.log('  scenes: ' + scenes.join(', '));
