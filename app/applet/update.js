import fs from 'fs';
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");
css = css.replace(/"Inter",\s*-apple-system,\s*BlinkMacSystemFont,\s*sans-serif/g, "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif");

// Update TextType.tsx
let textType = fs.readFileSync('src/components/TextType.tsx', 'utf8');
textType = textType.replace("const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [JSON.stringify(text)]);", 
"const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);");
fs.writeFileSync('src/components/TextType.tsx', textType);

fs.writeFileSync('src/index.css', css);
console.log('Fonts updated to San Francisco');
