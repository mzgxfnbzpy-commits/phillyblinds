import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const buf = readFileSync('C:/Users/Blind/PhillyBlinds Photos/PDF PRODUCTS/Select Metal Price List Distributor - Nov 22.pdf');
const data = new Uint8Array(buf);
const doc = await getDocument({ data }).promise;
console.log('Total pages:', doc.numPages);

for (let i = 1; i <= Math.min(doc.numPages, 32); i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  if (text.trim().length > 10) {
    console.log(`\n===== PAGE ${i} =====`);
    console.log(text);
  }
}
