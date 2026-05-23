const fs = require('fs');

// 1. UPDATE index.css
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace Inter/Segoe UI font stac with San Francisco
css = css.replace(/"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");
css = css.replace(/"Inter",\s*-apple-system,\s*BlinkMacSystemFont,\s*sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");
css = css.replace(/-apple-system,\s*BlinkMacSystemFont,\s*"SF Pro Text",\s*sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");
css = css.replace(/-apple-system,\s*BlinkMacSystemFont,\s*"SF Pro Display",\s*sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");
css = css.replace(/font-family:\s*['"]?-apple-system['"]?,\s*['"]?BlinkMacSystemFont['"]?,\s*['"]?SF Pro Display['"]?,\s*['"]?SF Pro Text['"]?,\s*sans-serif/g, "font-family: '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");

// Write back index.css
fs.writeFileSync('src/index.css', css);

// 2. UPDATE TextType.tsx
let textType = fs.readFileSync('src/components/TextType.tsx', 'utf8');
textType = textType.replace('const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [JSON.stringify(text)]);', 'const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);');
fs.writeFileSync('src/components/TextType.tsx', textType);

console.log('Update script completely successfully.');
