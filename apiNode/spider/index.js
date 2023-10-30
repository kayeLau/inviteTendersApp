const puppeteer = require('puppeteer');

(async () => {
  let ResultList = []
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');
  await page.goto('https://ecsg.com.cn/cms/NoticeList.html?id=1-1&typeid=4&word=&seacrhDate=');
  await page.waitForSelector('#noticeListTBody tr')

  await getHref()
  await getContent()

  console.log(ResultList)

  browser.close();

  // methods
  async function getContent() {
    for (let i = 0; i < ResultList.length ; i++) {
      await page.goto(ResultList[i].href);
      await page.waitForSelector('.edit-container > p')
      const result = await page.$$eval('.edit-container > p', rows => {
        let text = ''
        rows.forEach((row) => {
          const columns = row.querySelectorAll('span');
          columns.forEach(item => {
            text += item.innerText
          })
        })
        return text + '\n'
      })
      console.log(result)
      ResultList[i].content = result
    }
  }


  async function getHref() {
    const result = await page.$$eval('#noticeListTBody tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        const href = row.querySelector('td > a').href
        const title = columns[0].innerText
        const company = columns[1].innerText
        const time = columns[2].innerText
        const content = ''
        return { href, title, company, time, content }
      });
    });
    ResultList = result
  }
})();
