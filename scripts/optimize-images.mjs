import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const mentorsDir = path.join(process.cwd(), 'assets', 'images', 'students');

async function optimizeImages() {
  const files = fs.readdirSync(mentorsDir);
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
    const filePath = path.join(mentorsDir, file);
    const tempPath = filePath + '.tmp';
    console.log(`Optimizing ${file}...`);
    try {
      let pipeline = sharp(filePath).resize(600, null, { withoutEnlargement: true });
      if (file.toLowerCase().endsWith('.png')) {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else if (file.toLowerCase().endsWith('.webp')) {
        pipeline = pipeline.webp({ quality: 80 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80 });
      }
      await pipeline.toFile(tempPath);
      fs.renameSync(tempPath, filePath);
    } catch (e) {
      console.error(`Failed to optimize ${file}:`, e.message);
    }
  }
}

optimizeImages();
