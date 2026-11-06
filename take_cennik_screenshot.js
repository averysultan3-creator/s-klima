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

  console.log('Navigating to cennik page...');
  await page.goto('http://127.0.0.1:4174/s-klima/#/cennik', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, '05_cennik_desktop.png'), fullPage: true });

  console.log('Cennik screenshot saved!');
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
