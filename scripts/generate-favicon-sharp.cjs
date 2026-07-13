const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generate() {
  const input = path.join(__dirname, '..', 'public', 'logo.jpg');
  const publicDir = path.join(__dirname, '..', 'public');
  const docsDir = path.join(__dirname, '..', 'docs');

  const outputs = {
    ico: 'favicon.ico',
    icon16: 'icon-16.png',
    icon32: 'icon-32.png',
    icon48: 'icon-48.png',
    icon192: 'icon-192.png',
    icon512: 'icon-512.png',
    apple: 'apple-touch-icon.png',
  };

  if (!fs.existsSync(input)) {
    console.error('Input logo not found:', input);
    process.exit(1);
  }

  const sizes = [16, 32, 48, 64, 128, 180];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(input).resize(size, size, { fit: 'cover' }).png().toBuffer();
    pngBuffers.push(buf);
  }

  const icoBuf = await toIco(pngBuffers);
  fs.writeFileSync(path.join(publicDir, outputs.ico), icoBuf);
  fs.writeFileSync(path.join(docsDir, outputs.ico), icoBuf);

  await sharp(input).resize(16, 16, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.icon16));
  await sharp(input).resize(32, 32, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.icon32));
  await sharp(input).resize(48, 48, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.icon48));
  await sharp(input).resize(192, 192, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.icon192));
  await sharp(input).resize(512, 512, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.icon512));
  await sharp(input).resize(180, 180, { fit: 'cover' }).png().toFile(path.join(publicDir, outputs.apple));

  for (const fileName of [outputs.icon16, outputs.icon32, outputs.icon48, outputs.icon192, outputs.icon512, outputs.apple]) {
    fs.copyFileSync(path.join(publicDir, fileName), path.join(docsDir, fileName));
  }

  console.log('Generated icons in public and docs directories:');
  console.log(Object.values(outputs).join(', '));
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
