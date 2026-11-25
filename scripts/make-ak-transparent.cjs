const sharp = require("sharp");

sharp("public/ak47-source.jpg")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    for (let index = 0; index < data.length; index += 4) {
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const brightness = (red + green + blue) / 3;
      const whiteness = Math.min(red, green, blue);

      if (brightness > 238 && whiteness > 220) {
        data[index + 3] = 0;
      } else if (brightness > 220 && whiteness > 195) {
        const fade = Math.min(255, Math.max(0, ((brightness - 220) / 18) * 255));
        data[index + 3] = fade;
      }
    }

    return sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .trim({ threshold: 8 })
      .png()
      .toFile("public/ak47-transparent.png");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
