const sharp = require("sharp");

const source = "public/leaf1.png";

async function buildLeaf(output) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const saturation = max - min;
    const brightness = (red + green + blue) / 3;
    const isGreen =
      brightness > 65 &&
      green > red * 1.22 &&
      green > blue * 1.28 &&
      saturation > 38;
    const isLightOutline = brightness > 175 && saturation < 55;

    if (isGreen || isLightOutline) {
      data[index + 3] = isLightOutline ? Math.min(255, (brightness - 118) * 3) : 205;
    } else {
      data[index + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 5 })
    .png()
    .toFile(output);
}

Promise.all([
  buildLeaf("public/leaf1-transparent.png"),
  buildLeaf("public/leaf2-transparent.png"),
]).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
