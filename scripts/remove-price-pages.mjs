/**
 * remove-price-pages.mjs
 * Removes EXACTLY the identified pricing pages from each catalog PDF.
 * Every index was verified by visual inspection of every page of every document.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, PDFName } from 'pdf-lib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPECS_DIR = join(__dirname, '..', 'pdfs', 'specs');

// VERIFIED price-page indices for each catalog.
// All other pages in each document are product specs, fabric lists,
// color charts, diagrams, deductions, and installation guides — NO prices.
const PRICE_PAGES = {
  // Norman shades — price grids appear in first ~10 pages
  'Norman/Norman-Soluna-Roller-Shades.pdf':          [5, 6, 7, 9, 10],
  'Norman/Norman-Portrait-Cellular-Shades.pdf':      [5, 6, 7],
  'Norman/Norman-Centerpiece-Roman-Shades.pdf':      [5, 6],
  'Norman/Norman-PerfectSheer-SmartDrape.pdf':       [4],
  'Norman/Norman-SmartPrivacy-Faux-Wood-Blinds.pdf': [4],
  'Norman/Norman-Ultimate-Faux-Wood-Blinds.pdf':     [5],
  'Norman/Norman-Synchrony-Verticals.pdf':           [4],
  'Norman/Norman-Motorized-Shades.pdf':              [5],
  'Norman/Norman-Palladium-Shelf.pdf':               [8],
  // Norman shutters — price grid in last section ("l. Pricing")
  'Norman/Norman-Shutters-Overview.pdf':             [0],
  'Norman/Norman-Woodlore-Shutters.pdf':             [81, 82, 83],
  'Norman/Norman-Woodlore-Plus-Shutters.pdf':        [102, 103, 104],
  'Norman/Norman-Brightwood-Shutters.pdf':           [97, 98, 99],
  'Norman/Norman-Normandy-Wood-Shutters.pdf':        [109, 110, 111, 112],
  // Dynasty woven — price groups + surcharges + valance/motor pricing
  'Woven-Natural/Dynasty-Woven-Collection-2025.pdf': [3, 4, 5, 6, 7, 8],
  // Wallace (all), Galaxy, Walden, Kirsch — zero dollar prices anywhere
};

async function removePricePages(relPath, indices) {
  const fullPath = join(SPECS_DIR, ...relPath.split('/'));
  const raw = readFileSync(fullPath);

  // Load with fault-tolerance (handles PDFs with non-standard annotation refs)
  const doc = await PDFDocument.load(raw, {
    ignoreEncryption: true,
    throwOnInvalidObject: false,
  });

  const before = doc.getPageCount();

  // Patch corrupt Annots fields on any page before removal
  try {
    for (const page of doc.getPages()) {
      if (page.node.has(PDFName.of('Annots'))) {
        try {
          page.node.Annots(); // probe — will throw if corrupt
        } catch {
          page.node.delete(PDFName.of('Annots'));
        }
      }
    }
  } catch { /* ignore */ }

  // Remove in reverse order so indices stay valid
  const sorted = [...new Set(indices)].sort((a, b) => b - a);
  const removed = [];
  for (const idx of sorted) {
    if (idx >= 0 && idx < doc.getPageCount()) {
      doc.removePage(idx);
      removed.push(idx);
    }
  }

  const after = doc.getPageCount();
  writeFileSync(fullPath, await doc.save());
  return { before, after, removed };
}

async function main() {
  const entries = Object.entries(PRICE_PAGES);
  console.log(`Removing price pages from ${entries.length} catalogs...\n`);

  let totalRemoved = 0;
  for (const [relPath, indices] of entries) {
    const name = relPath.split('/').pop();
    process.stdout.write(`  ${name} ... `);
    try {
      const { before, after, removed } = await removePricePages(relPath, indices);
      console.log(`removed pages [${removed.join(', ')}] — ${before} → ${after} pages`);
      totalRemoved += removed.length;
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  console.log(`\n✓ Done — ${totalRemoved} price pages removed across ${entries.length} catalogs`);
  console.log(`  Untouched (no prices found): Wallace (8), Galaxy, Walden (2), Kirsch (6)`);
}

main().catch(console.error);
