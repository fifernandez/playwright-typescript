#!/usr/bin/env node
/**
 * generate_manifest.js
 * Run from the root folder (where index.html lives).
 * Generates manifest.json for the structure:
 *   suite/ → playwright/index.html
 *             ortoni/index.html
 *             allure/index.html
 *
 * Usage:
 *   node generate_manifest.js
 */

const fs = require('fs');
const path = require('path');

const REPORTS = ['playwright', 'ortoni', 'allure'];

function isDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}
function isFile(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

const manifest = {};

// Each top-level folder (except known files) is a suite
const entries = fs.readdirSync('.').filter(e => {
  if (!isDir(e)) return false;
  // skip hidden folders and node_modules
  if (e.startsWith('.') || e === 'node_modules') return false;
  return true;
});

for (const suite of entries) {
  const reps = [];
  for (const rep of REPORTS) {
    const repPath = path.join(suite, rep);
    if (!isDir(repPath)) continue;
    if (isFile(path.join(repPath, 'index.html'))) reps.push(rep);
  }
  if (reps.length > 0) manifest[suite] = reps;
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log('manifest.json generated:');
console.log(JSON.stringify(manifest, null, 2));
