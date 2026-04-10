import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/experiences', name: 'experiences' },
  { path: '/photos', name: 'photos' },
  { path: '/project/1', name: 'project-detail' }
];

async function takeScreenshots() {
  const type = process.argv[2] || 'before';
  if (type !== 'before' && type !== 'after') {
    console.error('Argument must be "before" or "after"');
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), 'screenshots', type);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Taking "${type}" screenshots...`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Navigating to ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      // Wait a bit extra for any animations
      await page.waitForTimeout(1000);
      
      const screenshotPath = path.join(outDir, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot to ${screenshotPath}`);
    } catch (error) {
      console.error(`Failed to capture ${url}:`, error);
    }
  }

  await browser.close();
  console.log('Done!');
}

takeScreenshots().catch(console.error);
