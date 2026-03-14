import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

function parseStatusRows(markdown) {
  const lines = markdown.split('\n');
  const start = lines.findIndex((line) =>
    line.includes('| Tool | File | Current State | Basis |')
  );
  if (start === -1) return [];

  const rows = [];
  for (let i = start + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith('|')) break;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((v) => v.trim());
    if (cells.length !== 4) continue;
    rows.push({
      tool: cells[0],
      file: cells[1].replace(/`/g, ''),
      state: cells[2].replace(/\*\*/g, ''),
      basis: cells[3]
    });
  }
  return rows;
}

test('README status matrix references existing files with valid states', () => {
  const readme = readFileSync('README.md', 'utf8');
  const rows = parseStatusRows(readme);

  assert.ok(rows.length > 0, 'README status matrix rows were not found');

  for (const row of rows) {
    assert.equal(existsSync(row.file), true, `Missing file in matrix: ${row.file}`);
    assert.ok(
      ['Stable', 'Experimental'].includes(row.state),
      `Invalid state for ${row.tool}: ${row.state}`
    );
    assert.ok(row.basis.length > 0, `Basis is empty for ${row.tool}`);
  }
});
