const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 27; seed <= 36; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => cell.innerText.replace(/,/g, '').trim())
        .map(text => parseFloat(text))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
