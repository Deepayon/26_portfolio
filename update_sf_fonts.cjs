const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/"Inter",\s*-apple-system,\s*BlinkMacSystemFont,\s*sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', sans-serif");
css = css.replace(/"Inter", -apple-system, BlinkMacSystemFont, sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', sans-serif");


fs.writeFileSync('src/index.css', css);
console.log('Fonts updated to San Francisco Stack');
