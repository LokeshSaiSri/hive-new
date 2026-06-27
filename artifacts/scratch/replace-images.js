const fs = require('fs');
const file = 'd:\\\\hive-new\\\\src\\\\data\\\\coursePages\\\\ai-marketing.ts';
let content = fs.readFileSync(file, 'utf8');

// Ensure cdnAsset is imported
if (!content.includes('cdnAsset')) {
  content = content.replace('import { asset, videoAsset }', 'import { asset, videoAsset, cdnAsset }');
  if (!content.includes('cdnAsset')) { 
    content = content.replace('import { asset }', 'import { asset, cdnAsset }');
  }
}

const images = [
  'images/Website pics/D2c showcase/DSC01245.jpeg',
  'images/Website pics/D2c showcase/DSC02669.jpeg',
  'images/Website pics/D2c showcase/DSC02675.jpeg',
  'images/Website pics/D2c showcase/DSC02684.jpeg',
  'images/Website pics/D2c showcase/DSC02687.jpeg',
  'images/Website pics/D2c showcase/DSC02696.jpeg',
  'images/Website pics/Orientation/DSC01710.jpeg',
  'images/Website pics/Orientation/DSC01745.jpeg',
  'images/Website pics/Orientation/DSC01783.jpeg',
  'images/Website pics/Orientation/DSC01789.jpeg',
  'images/Website pics/d2c bazaar/DSC01382.jpeg',
  'images/Website pics/d2c bazaar/DSC01390.jpeg',
  'images/Website pics/d2c bazaar/DSC01402.jpeg'
];

let i = 0;
while (content.includes('asset("images/student-stories/deepak-chib.jpg")')) {
  const img = images[i % images.length];
  i++;
  content = content.replace('asset("images/student-stories/deepak-chib.jpg")', `cdnAsset("${img}")`);
}

fs.writeFileSync(file, content);
console.log('Replaced ' + i + ' images');
