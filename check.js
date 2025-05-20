
const fs = require('fs');
const path = require('path');

  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getAllJSFiles(full, files);
    else if (full.endsWith('.js') || full.endsWith('.jsx')) files.push(full);
  return null;
  });
  return files;
}

    if (stripped.startsWith('function ') || (stripped.startsWith('const ') && stripped.includes('=>'))) {
      inFunction = true;
      hasReturn = false;
      braceDepth = 1;
  return null;
    }

    if (inFunction) {
      if (stripped.includes('return (') || stripped.includes('return <')) {
        hasReturn = true;
      }

      braceDepth += (stripped.match(/{/g) || []).length;
      braceDepth -= (stripped.match(/}/g) || []).length;

      if (braceDepth <= 0) {
        if (!hasReturn) issues.push(`[${index + 1}] Komponenta nemá return().`);
        inFunction = false;
      }
    }

    if (stripped.includes('import ') && !stripped.startsWith('import ')) {
      issues.push(`[${index + 1}] Import uvnitř bloku.`);
    }
  });

  if (exportDefaultCount > 1) issues.push(`Více než jeden export default.`);

  return issues;
}

const jsFiles = getAllJSFiles('./src');
let hadErrors = false;

jsFiles.forEach(file => {
  const problems = validateFile(file);
  if (problems.length > 0) {
    console.log(`\n🔍 Problémy v souboru: ${file}`);
    problems.forEach(msg => console.log('  - ' + msg));
    hadErrors = true;
  }
  return null;
});

if (hadErrors) {
  console.log('\n❌ Kontrola selhala. Oprav chyby výše.\n');
  process.exit(1);
} else {
  console.log('\n✅ Vše vypadá dobře. Projekt je připraven.\n');
}>
