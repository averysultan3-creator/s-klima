import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\921ea1db-d485-4484-bc6f-94ec924070ac\\audit";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Main page desktop
  console.log('Navigating to main page...');
  await page.goto('http://127.0.0.1:4174/s-klima/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, '01_main_desktop.png'), fullPage: true });

  // 2. Main page mobile view
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.screenshot({ path: path.join(outDir, '02_main_mobile.png'), fullPage: false });

  // 3. Hub QR page mobile
  await page.goto('http://127.0.0.1:4174/s-klima/#/hub', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, '03_hub_mobile.png'), fullPage: false });

  // 4. Realizacje page desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4174/s-klima/#/realizacje', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, '04_realizacje_desktop.png'), fullPage: true });

  console.log('Screenshots completed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
