const puppeteer = require('puppeteer');

module.exports = async () => {
  let resultList = []
  let pageStart = 1
  let pageEnd = 4
  const Bid_controller = require('../controllers/bid_controller')
  const bid_controller = new Bid_controller()
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');
  // await page.goto('https://ecsg.com.cn/cms/NoticeList.html?id=1-1&typeid=4&word=&seacrhDate=');

  for (let i = pageStart; i < pageEnd; i++) {
    await jumpToPage(i)
    await getHref()
    await getContent()
    await insertBid()
  }

  browser.close();

  // methods
  async function getContent() {
    for (let i = 0; i < resultList.length; i++) {
      try {
        await page.goto(resultList[i].data_href);
        await page.waitForSelector('.edit-container > p')
        const result = await page.$eval('.edit-container', row => {
          let text = ''
          const columns = row.querySelectorAll('.edit-container>p,.edit-container>table');
          columns.forEach(item => {
            if (item.tagName === 'TABLE') {
              let targetHTML = item.innerHTML.replaceAll('windowtext','#000')
              text += '<table>' + targetHTML + '</table>'
              // item.querySelectorAll('tr').forEach(tr => {
              //   text += '<tr>'
              //   tr.querySelectorAll('td').forEach(td => {
              //     let content = String(td.innerHTML).replace(/\s*<[^>]*>\s*/g, '')
              //     text += '<td>' + content + '</td>'
              //   })
              //   text += '</tr>'
              // })
              // text += '</table>'
            } else if (item.tagName === 'P') {
              text += String(item.innerHTML).replace(/\s*<[^>]*>\s*/g, '')
            }
            text += '|'
          })
          return text
        })
        resultList[i].bid_body = result
      } catch (err) {
        continue
      }
    }
  }

  async function getHref() {
    await page.waitForSelector('#noticeListTBody tr')
    const result = await page.$$eval('#noticeListTBody tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        const data_href = row.querySelector('td > a').href
        const bid_title = columns[0].innerText
        const bid_unit = columns[1].innerText
        const release_time = columns[2].innerText
        const bid_body = ''
        return { data_href, bid_title, bid_unit, release_time, bid_body }
      });
    });
    resultList = result
  }

  async function insertBid() {
    const data = resultList.map(item => {
      return {
        bid_title: item.bid_title,
        bid_body: item.bid_body,
        bid_table: item.bid_table,
        release_time: item.release_time,
        bid_unit: item.bid_unit || null,
        bid_type: 0, // 政府项目
        pj_type: item.pj_type || 0,
        bid_city: item.bid_city || null,
        bid_contact: item.bid_contact || null,
        bid_amount: item.bid_amount || null,
        data_source: 0, // 机器获取
        data_href: item.data_href
      }
    })
    if(data.length){
      await bid_controller.postInsertBidItems(data).then(res => {
        if(res.success){
          console.log('已成功存入')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  async function toNextPage() {
    await page.click('.page-next')
  }

  async function jumpToPage(pageNum) {
    await page.goto('https://ecsg.com.cn/cms/NoticeList.html?id=1-1&typeid=4&word=&seacrhDate=');
    await page.waitForSelector('.page-skip-num')
    await page.click('.page-skip-num');
    await page.keyboard.press('Backspace');
    await page.type('.page-skip-num', String(pageNum));
    await page.waitForSelector('.cui-button')
    await page.click('.cui-button')

  }
};
