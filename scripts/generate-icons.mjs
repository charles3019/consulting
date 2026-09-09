import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = await readFile(new URL('../src/app/icon.svg', import.meta.url));
for (const [size, file] of [[180, '../src/app/apple-icon.png'], [192, '../public/icon-192.png'], [512, '../public/icon-512.png']]) {
  await sharp(source).resize(size, size).png().toFile(fileURLToPath(new URL(file, import.meta.url)));
}
const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((buffer, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(buffer.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += buffer.length;
});
await writeFile(new URL('../src/app/favicon.ico', import.meta.url), Buffer.concat([header, ...images]));
console.log('Generated favicon, Apple touch icon and application icons.');
