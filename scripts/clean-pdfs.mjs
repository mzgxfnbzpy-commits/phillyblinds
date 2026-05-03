/**
 * clean-pdfs.mjs
 * Covers pricing areas on every page of every PDF in pdfs/specs/
 * Strategy per folder:
 *   Norman/    — dealer price lists: white out right 42% + bottom 14% of every page
 *   Wallace/   — dealer price lists: white out right 42% + bottom 14% of every page
 *   Woven-Natural/ — fabric books with price tables: right 40% + bottom 12%
 *   Hardware-Kirsch/ — customer brochures: right 32% + bottom 10%
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPECS_DIR  = join(__dirname, '..', 'pdfs', 'specs');

// White-out coverage per folder (fraction of page)
const COVERAGE = {
  'Norman':           { right: 0.42, bottom: 0.14 },
  'Wallace':          { right: 0.42, bottom: 0.14 },
  'Woven-Natural':    { right: 0.40, bottom: 0.12 },
  'Hardware-Kirsch':  { right: 0.32, bottom: 0.10 },
};

function getFolder(filePath) {
  const parts = filePath.replace(SPECS_DIR, '').split(/[\\/]/);
  return parts.find(p => p.length > 0) || '';
}

async function cleanPdf(filePath) {
  const folder  = getFolder(filePath);
  const cov     = COVERAGE[folder] || { right: 0.42, bottom: 0.14 };
  const rawBytes = readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(rawBytes, { ignoreEncryption: true });
  const font   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages  = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();

    // ── RIGHT PRICE COLUMN ────────────────────────────────────
    const rightX = width * (1 - cov.right);
    page.drawRectangle({
      x: rightX, y: 0,
      width:  width  * cov.right,
      height: height,
      color:  rgb(1, 1, 1),
      opacity: 1,
    });

    // ── BOTTOM PRICE ROW ──────────────────────────────────────
    page.drawRectangle({
      x: 0, y: 0,
      width:  width,
      height: height * cov.bottom,
      color:  rgb(1, 1, 1),
      opacity: 1,
    });

    // ── LABEL IN RIGHT COLUMN ─────────────────────────────────
    const labelFontSize = Math.max(7, width * 0.018);
    const labelX = rightX + (width * cov.right * 0.08);
    page.drawText('Call for current pricing', {
      x: labelX,
      y: height * 0.50,
      size: labelFontSize,
      font,
      color: rgb(0.78, 0.59, 0.25),
      rotate: { type: 'degrees', angle: 90 },
    });
    page.drawText('(609) 742-1720', {
      x: labelX + labelFontSize * 1.6,
      y: height * 0.50,
      size: labelFontSize,
      font,
      color: rgb(0.6, 0.6, 0.6),
      rotate: { type: 'degrees', angle: 90 },
    });
  }

  const saved = await pdfDoc.save();
  writeFileSync(filePath, saved);
  return pages.length;
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkDir(full));
    else if (extname(entry).toLowerCase() === '.pdf') files.push(full);
  }
  return files;
}

async function main() {
  const pdfs = walkDir(SPECS_DIR);
  console.log(`Processing ${pdfs.length} PDFs...\n`);

  let totalPages = 0;
  for (const pdf of pdfs) {
    const rel = pdf.replace(SPECS_DIR + '\\', '').replace(SPECS_DIR + '/', '');
    process.stdout.write(`  ${rel} ... `);
    try {
      const n = await cleanPdf(pdf);
      console.log(`${n} pages cleaned`);
      totalPages += n;
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  console.log(`\n✓ Done — ${totalPages} pages processed across ${pdfs.length} PDFs`);
}

main().catch(console.error);
