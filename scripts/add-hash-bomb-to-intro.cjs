const sharp = require("sharp");

const source = "public/intro-emblem-clean.webp";
const output = "public/intro-emblem-hash-bomb.webp";
const text = Buffer.from(
  '<svg width="801" height="645">' +
    '<text x="400.5" y="323" text-anchor="middle" fill="#f4f1e8" stroke="#050505" stroke-width="2" paint-order="stroke" font-family="Arial Black,Arial,sans-serif" font-size="74" font-weight="900" letter-spacing="7">H4SH BOMB</text>' +
  "</svg>",
);

sharp(source)
  .composite([{ input: text, blend: "over" }])
  .webp({ quality: 92 })
  .toBuffer()
  .then((buffer) => require("fs").writeFileSync(output, buffer))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
