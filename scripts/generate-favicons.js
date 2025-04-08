const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 192, 512];
const appleIconSize = 180;

async function generateFavicons() {
  const inputFile = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const outputDir = path.join(process.cwd(), 'public');

  // Create favicon.ico (multi-size ICO file)
  await sharp(inputFile)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'favicon.ico'));

  // Generate PNG favicons
  for (const size of sizes) {
    await sharp(inputFile)
      .resize(size, size)
      .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
  }

  // Generate Apple Touch Icon
  await sharp(inputFile)
    .resize(appleIconSize, appleIconSize)
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  console.log('All favicon files have been generated successfully!');
}

generateFavicons().catch(console.error); 