import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const HTML_FILES = [
  'index.html',
  'noise.html',
  'prism.html',
  'multi-layer-stego.html',
  'animated-prism.html',
  'disaster-mesh-complete.html'
];

function extractLocalHrefs(html) {
  const hrefs = [];
  const hrefPattern = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href || href.startsWith('#')) continue;
    if (href.includes('${')) continue;
    if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href)) continue;
    hrefs.push(href);
  }
  return hrefs;
}

test('all in-app navigation links point to existing local files', () => {
  for (const htmlFile of HTML_FILES) {
    const html = readFileSync(htmlFile, 'utf8');
    const hrefs = extractLocalHrefs(html);

    for (const href of hrefs) {
      const cleanHref = href.split('#')[0].split('?')[0];
      if (!cleanHref || cleanHref.endsWith('/')) continue;
      const resolved = join(dirname(htmlFile), cleanHref);
      assert.equal(
        existsSync(resolved),
        true,
        `${htmlFile} contains broken local link: ${href}`
      );
    }
  }
});
