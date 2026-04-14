const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'landing'];
const extensions = ['.ts', '.tsx'];

const replacements = [
  // 1. Convert hover shadows to shadow-soft
  { regex: /hover:shadow-glow/g, replacement: 'hover:shadow-soft' },
  { regex: /hover:shadow-\[.*?\]/g, replacement: 'hover:shadow-soft' },
  { regex: /hover:shadow-md/g, replacement: 'hover:shadow-soft' },
  { regex: /hover:shadow-lg/g, replacement: 'hover:shadow-soft' },
  { regex: /hover:shadow-xl/g, replacement: 'hover:shadow-soft' },
  
  // 2. Remove static shadows from cards
  // Note: some shadow-glow might be on buttons, but the designs usually prefer button shadow-soft
  { regex: /\bshadow-glow\b/g, replacement: '' },
  { regex: /\bshadow-sm\b/g, replacement: '' },
  { regex: /\bshadow-md\b/g, replacement: '' },
  { regex: /\bshadow-lg\b/g, replacement: '' },
  { regex: /\bshadow-xl\b/g, replacement: '' },
  { regex: /\bshadow-2xl\b/g, replacement: '' },
  { regex: /\bshadow-inner\b/g, replacement: '' },
  
  // Remove absolute drop-shadows and complex static shadows
  { regex: /drop-shadow-\[.*?\]/g, replacement: '' },
  { regex: /(?<!hover:)shadow-\[.*?\]/g, replacement: '' },
  
  // Clean up any double spaces that might be created
  { regex: /  +/g, replacement: ' ' },
  { regex: / "/g, replacement: '"' },
  { regex: /" /g, replacement: '"' }
];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  replacements.forEach(({ regex, replacement }) => {
    newContent = newContent.replace(regex, replacement);
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated shadows in ${filePath}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (extensions.includes(ext)) {
        processFile(fullPath);
      }
    }
  });
}

// Run script
targetDirs.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log('Shadow cleanup completed successfully.');
