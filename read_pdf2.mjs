import { readFileSync, writeFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const buf = readFileSync('C:/Users/Blind/PhillyBlinds Photos/PDF PRODUCTS/Select Metal Price List Distributor - Nov 22.pdf');
const data = new Uint8Array(buf);
const doc = await getDocument({ data }).promise;

let out = '';
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  if (text.trim().length > 10) {
    out += `\n===== PAGE ${i} =====\n${text}\n`;
  }
}
writeFileSync('select_pdf_out.txt', out, 'utf8');
console.log('Done. Written to select_pdf_out.txt, size:', out.length);
