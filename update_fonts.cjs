const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Prepend the font imports
const imports = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');\n`;

if (!css.includes('fonts.googleapis.com')) {
  css = imports + css;
}

// Replace font-families
css = css.replace(/-apple-system,\s*BlinkMacSystemFont,\s*"SF Pro Text",\s*sans-serif/g, '"Inter", -apple-system, BlinkMacSystemFont, sans-serif');
css = css.replace(/-apple-system,\s*BlinkMacSystemFont,\s*"SF Pro Display",\s*sans-serif/g, '"Inter", -apple-system, BlinkMacSystemFont, sans-serif');
css = css.replace(/"SF Mono",\s*ui-monospace,\s*Menlo,\s*Monaco,\s*Consolas,\s*monospace/g, '"JetBrains Mono", monospace');

fs.writeFileSync('src/index.css', css);
console.log('Fonts updated');
