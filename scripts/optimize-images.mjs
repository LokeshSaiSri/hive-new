import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesRoot = path.join(process.cwd(), 'assets', 'images');
const targetFolders = ["news", "tech", "timeline", "mentors", "Website pics", "logos", "students", "placement-reports", "challenges"];

function walkImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkImages(full));
    } else {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        results.push(full);
      }
    }
  }
  return results;
}

async function optimizeImages() {
  for (const folder of targetFolders) {
    const dir = path.join(imagesRoot, folder);
    if (!fs.existsSync(dir)) continue;
    
    const files = walkImages(dir);
    for (const filePath of files) {
      // Skip if already small enough or if it's a small logo
      const stat = fs.statSync(filePath);
      if (stat.size < 50000) continue; // Skip images under 50KB

      const tempPath = filePath + '.tmp';
      console.log(`Optimizing ${path.relative(imagesRoot, filePath)}...`);
      try {
        let pipeline = sharp(filePath).rotate().resize(1200, null, { withoutEnlargement: true });
        
        if (filePath.toLowerCase().endsWith('.png')) {
          pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
        } else if (filePath.toLowerCase().endsWith('.webp')) {
          pipeline = pipeline.webp({ quality: 80 });
        } else {
          pipeline = pipeline.jpeg({ quality: 80 });
        }
        await pipeline.toFile(tempPath);
        fs.renameSync(tempPath, filePath);
      } catch (e) {
        console.error(`Failed to optimize ${filePath}:`, e.message);
      }
    }
  }
}

optimizeImages();
