// Renders cv/cv.html to public/Prosper_Otonye_CV.pdf. Run: node cv/build-cv.cjs
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, 'cv.html'));
  await p.pdf({ path: path.resolve(__dirname, '../public/Prosper_Otonye_CV.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
