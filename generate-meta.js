const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const rootDir = __dirname;
const result = {};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['.git', 'node_modules', '.github'].includes(file)) {
        walk(fullPath);
      }
    } else if (/\.(png|jpe?g|webp|gif|avif)$/i.test(fullPath)) {
      try {
        const dimensions = sizeOf(fullPath);
        let relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
        result[relativePath] = { w: dimensions.width, h: dimensions.height };
      } catch (err) {
        console.error('Skipping invalid image:', fullPath);
      }
    }
  }
}

walk(rootDir);
fs.writeFileSync('image-meta.json', JSON.stringify(result));
console.log('✅ Generated image-meta.json successfully!');
