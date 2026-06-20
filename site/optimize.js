const sharp = require('sharp');
const src = '../harvasta/project/assets/';
const out = 'assets/img/';

const jobs = [
  // hero — full-bleed LCP, responsive widths + jpg fallback
  ['hero-c.jpg', 'hero-1920.webp', 1920, { webp: 72 }],
  ['hero-c.jpg', 'hero-1280.webp', 1280, { webp: 72 }],
  ['hero-c.jpg', 'hero-768.webp',  768,  { webp: 70 }],
  ['hero-c.jpg', 'hero-1280.jpg',  1280, { jpg: 72 }],
  // 3-card "viewing" image
  ['viewing-c.jpg', 'viewing.webp', 600, { webp: 74 }],
  // feature column images (~460px display) + reused as floating video imgs
  ['cat-1-c.jpg',   'cat-1.webp',   700, { webp: 74 }],
  ['video-1-c.jpg', 'video-1.webp', 720, { webp: 74 }],
  ['video-2-c.jpg', 'video-2.webp', 900, { webp: 74 }],
];

(async () => {
  for (const [from, to, w, q] of jobs) {
    let img = sharp(src + from).resize({ width: w, withoutEnlargement: true });
    if (q.webp) img = img.webp({ quality: q.webp });
    if (q.jpg)  img = img.jpeg({ quality: q.jpg, mozjpeg: true });
    await img.toFile(out + to);
    const meta = await sharp(out + to).metadata();
    console.log(to.padEnd(16), meta.width + 'x' + meta.height, Math.round((require('fs').statSync(out + to).size) / 1024) + 'KB');
  }
})();
