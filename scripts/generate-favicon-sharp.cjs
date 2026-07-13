const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generate() {
  const input = path.join(__dirname, '..', 'public', 'logo.jpg');
  const outIco = path.join(__dirname, '..', 'public', 'favicon.ico');
  const out192 = path.join(__dirname, '..', 'public', 'icon-192.png');
  const outApple = path.join(__dirname, '..', 'public', 'apple-touch-icon.png');

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
  fs.writeFileSync(outIco, icoBuf);

  await sharp(input).resize(192, 192, { fit: 'cover' }).png().toFile(out192);
  await sharp(input).resize(180, 180, { fit: 'cover' }).png().toFile(outApple);

  console.log('Generated', outIco, out192, outApple);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
