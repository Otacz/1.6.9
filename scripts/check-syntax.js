
const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('>;') || line.includes('};>') || line.includes('});>')) {
      console.error(`✖️  Chyba v souboru ${filePath} na řádku ${idx + 1}: ${line}`);
      process.exit(1);
    }
  });
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      checkFile(fullPath);
    }
  });
}

walk('./src');
