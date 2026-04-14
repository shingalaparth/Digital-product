const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'landing'];
const extensions = ['.ts', '.tsx'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // 1. Repair cn function: join("") -> join(" ")
  newContent = newContent.replace(/join\(""\)/g, 'join(" ")');

  // 2. Repair imports: from" -> from "
  newContent = newContent.replace(/from"/g, 'from "');

  // 3. Repair className logic: ?" -> ? "
  newContent = newContent.replace(/\?"/g, '? "');
  
  // 4. Repair :" -> : "
  // Be careful with JSON keys, but in TSX files usually it's for objects or ternaries.
  // Actually, ternary operators like isTrue ?"class":"class" => there is a space missing.
  // Let's just fix the join(" ") first, that resolves the entire layout bug.
  // `v.filter(Boolean).join(" ")` will add spaces between strings no matter what!
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Repaired ${filePath}`);
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

targetDirs.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log('Repair completed successfully.');
