import { readFileSync, writeFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const buf = readFileSync('C:/Users/Blind/PhillyBlinds Photos/PDF PRODUCTS/Select Metal Price List Distributor - Nov 22.pdf');
const data = new Uint8Array(buf);
const doc = await getDocument({ data }).promise;

const [start, end] = [parseInt(process.argv[2]||'1'), parseInt(process.argv[3]||'8')];
for (let i = start; i <= Math.min(end, doc.numPages); i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  if (text.trim().length > 5) {
    console.log(`\n===== PAGE ${i} =====`);
    console.log(text);
  }
}
