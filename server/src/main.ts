import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors'
import bodyParser from 'body-parser';
import path from 'path';

const host = process.env.HOST ?? 'localhost';
const port = 3001;
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function wait(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
app.post('/screenshot', async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage() as any;
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log('__dirname', __dirname)
  const screenshot = await page.screenshot({ path: path.resolve(__dirname, `./assets/${url}.png`), });
  await browser.close();

  const buffer = Buffer.from(screenshot);

// 将 Buffer 转换为 Base64 编码的字符串
  const base64String = buffer.toString('base64');
  console.log('screenshot11', base64String);
  res.set('Content-Type', 'image/jpg');
  res.send(`data:image/png;base64,${base64String}`);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
