// One-shot image optimizer for public/images/*.
// Resizes to max 1600px, re-encodes with aggressive compression,
// keeps original file names so DB references stay valid.
//
// Run: node scripts/optimize-images.mjs

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join } from 'path';

const IMAGE_DIR = 'public/images';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;

async function main() {
  const entries = await readdir(IMAGE_DIR);
  const targets = entries.filter(
    (f) => /\.(png|jpe?g)$/i.test(f) && !/^logo\./i.test(f),
  );

  let before = 0;
  let after = 0;

  for (const file of targets) {
    const inPath = join(IMAGE_DIR, file);
    const tmpPath = `${inPath}.tmp`;
    const sizeBefore = (await stat(inPath)).size;

    const pipeline = sharp(inPath).resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    const isJpg = /\.jpe?g$/i.test(file);
    if (isJpg) {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(tmpPath);
    } else {
      // PNG: re-encode with max compression + adaptive filter.
      // Keep lossless to avoid colour posterisation on product photography.
      await pipeline
        .png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
        .toFile(tmpPath);
    }

    await unlink(inPath);
    await rename(tmpPath, inPath);

    const sizeAfter = (await stat(inPath)).size;
    before += sizeBefore;
    after += sizeAfter;

    const saved = Math.round((1 - sizeAfter / sizeBefore) * 100);
    console.log(
      `${file.padEnd(48)} ${(sizeBefore / 1024).toFixed(0).padStart(6)}KB → ${(sizeAfter / 1024).toFixed(0).padStart(6)}KB   (-${saved}%)`,
    );
  }

  const pct = Math.round((1 - after / before) * 100);
  console.log('');
  console.log(
    `Total: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB  (-${pct}%)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
