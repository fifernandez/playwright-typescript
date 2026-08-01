#!/usr/bin/env node
/**
 * Local Allure report flow (mirrors CI numbered runs):
 * 1. Generate the latest report into out/reports/allure/<n>/awesome/
 * 2. Stamp history.jsonl with a stable local URL so History rows are clickable
 * 3. Serve all archived runs from one fixed-port server and open the latest
 *
 * Env:
 *   ALLURE_LOCAL_PORT   default 5252
 *   ALLURE_KEEP_REPORTS default 20
 *   ALLURE_NO_OPEN=1    generate/archive only, do not start the server
 */
import { serve } from '@allurereport/static-server';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const allureDir = join(root, 'out/reports/allure');
const legacyRunsDir = join(root, 'out/reports/allure-runs');
const resultsDir = join(root, 'out/results/allure');
const historyFile = join(root, 'out/results/allure-history.jsonl');

const port = Number(process.env.ALLURE_LOCAL_PORT || 5252);
const keepReports = Number(process.env.ALLURE_KEEP_REPORTS || 20);
const noOpen = process.env.ALLURE_NO_OPEN === '1' || process.argv.includes('--no-open');

const listRunNumbers = (dir = allureDir) => {
  if (!existsSync(dir)) {
    return [];
  }
  return readdirSync(dir)
    .filter(name => /^\d+$/.test(name))
    .map(Number)
    .sort((a, b) => a - b);
};

const migrateLegacyRuns = () => {
  if (!existsSync(legacyRunsDir)) {
    return;
  }
  mkdirSync(allureDir, { recursive: true });
  for (const run of listRunNumbers(legacyRunsDir)) {
    const from = join(legacyRunsDir, String(run));
    const to = join(allureDir, String(run));
    if (existsSync(to)) {
      continue;
    }
    renameSync(from, to);
  }
  rmSync(legacyRunsDir, { recursive: true, force: true });
  console.log(`Migrated legacy runs from ${legacyRunsDir} -> ${allureDir}`);
};

/** Keep only numbered run folders + index.html under out/reports/allure. */
const cleanAllureRoot = () => {
  if (!existsSync(allureDir)) {
    return;
  }
  for (const name of readdirSync(allureDir)) {
    if (/^\d+$/.test(name) || name === 'index.html') {
      continue;
    }
    rmSync(join(allureDir, name), { recursive: true, force: true });
  }
};

const nextRunNumber = () => {
  const runs = listRunNumbers();
  return runs.length ? runs[runs.length - 1] + 1 : 1;
};

/**
 * Awesome History links are {reportUrl}/awesome#<testId>.
 * Move the generated (hoisted) report into awesome/ so those links hit the real app.
 */
const nestReportUnderAwesome = runDir => {
  const awesomeDir = join(runDir, 'awesome');
  mkdirSync(awesomeDir, { recursive: true });
  for (const name of readdirSync(runDir)) {
    if (name === 'awesome') {
      continue;
    }
    renameSync(join(runDir, name), join(awesomeDir, name));
  }
  writeFileSync(
    join(runDir, 'index.html'),
    [
      '<!DOCTYPE html>',
      '<meta charset="utf-8">',
      '<meta http-equiv="refresh" content="0; url=awesome/">',
      '<title>Redirecting to Allure report</title>',
      '<a href="awesome/">Allure report</a>',
      '',
    ].join('\n'),
  );
};

const writeRunsIndex = latestRun => {
  mkdirSync(allureDir, { recursive: true });
  writeFileSync(
    join(allureDir, 'index.html'),
    [
      '<!DOCTYPE html>',
      '<meta charset="utf-8">',
      `<meta http-equiv="refresh" content="0; url=${latestRun}/">`,
      `<title>Redirecting to Allure report #${latestRun}</title>`,
      `<a href="${latestRun}/">Allure report #${latestRun}</a>`,
      '',
    ].join('\n'),
  );
};

const pruneOldRuns = () => {
  const runs = listRunNumbers();
  const toDelete = runs.slice(0, Math.max(0, runs.length - keepReports));
  for (const run of toDelete) {
    rmSync(join(allureDir, String(run)), { recursive: true, force: true });
  }
};

const stampHistoryUrl = reportUrl => {
  if (!existsSync(historyFile)) {
    console.warn(`No history file at ${historyFile}; skip URL stamp`);
    return;
  }
  const lines = readFileSync(historyFile, 'utf8').split(/\r?\n/).filter(Boolean);
  if (!lines.length) {
    return;
  }
  const entry = JSON.parse(lines[lines.length - 1]);
  entry.url = reportUrl;
  for (const result of Object.values(entry.testResults ?? {})) {
    if (result && typeof result === 'object') {
      result.url = reportUrl;
    }
  }
  lines[lines.length - 1] = JSON.stringify(entry);
  writeFileSync(historyFile, `${lines.join('\n')}\n`);
  console.log(`Stamped history url on latest entry: ${reportUrl}`);
};

if (!existsSync(resultsDir) || readdirSync(resultsDir).length === 0) {
  console.error(`No Allure results found in ${resultsDir}. Run tests first.`);
  process.exit(1);
}

migrateLegacyRuns();
cleanAllureRoot();

const runNum = nextRunNumber();
const runDir = join(allureDir, String(runNum));
const reportUrl = `http://localhost:${port}/${runNum}`;

mkdirSync(allureDir, { recursive: true });
rmSync(runDir, { recursive: true, force: true });

const generate = spawnSync(
  'npx',
  ['allure', 'generate', resultsDir, '--output', runDir, '--history-limit', String(keepReports)],
  { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
);
if (generate.status !== 0) {
  process.exit(generate.status ?? 1);
}

if (!existsSync(runDir)) {
  console.error(`Allure generate did not produce ${runDir}`);
  process.exit(1);
}

nestReportUnderAwesome(runDir);
writeRunsIndex(runNum);
pruneOldRuns();
cleanAllureRoot();
stampHistoryUrl(reportUrl);

console.log(`Archived Allure report #${runNum} -> ${runDir}/awesome`);

if (noOpen) {
  process.exit(0);
}

const server = await serve({
  port,
  servePath: allureDir,
  open: false,
});
await server.open(`/${runNum}/awesome/`);
console.log(`Serving archived runs from ${allureDir}`);
console.log(`Latest report: ${reportUrl}/awesome/`);
console.log('Press Ctrl+C to stop.');
