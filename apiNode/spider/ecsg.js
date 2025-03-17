const puppeteer = require('puppeteer');
const Bid_controller = require('../controllers/bid')
const bid_controller = new Bid_controller()

module.exports = async () => {
  let resultList = []
  let pageStart = 1
  let pageEnd = 2
  const browser = await puppeteer.launch({
    headless: false,
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
        await page.goto(resultList[i].dataHref);
        await page.waitForSelector('#noticeContentDiv>p')
        const result = await page.$eval('#noticeContentDiv', row => {
          let text = ''
          const columns = row.querySelectorAll('#noticeContentDiv>p,#noticeContentDiv>table');
          columns.forEach(item => {
            if (item.tagName === 'TABLE') {
              let targetHTML = item.innerHTML.replaceAll('windowtext', '#000')
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
        resultList[i].bidBody = result
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
        const dataHref = row.querySelector('td > a').href
        const bidTitle = columns[0].innerText
        const bidUnit = columns[1].innerText
        const releaseTime = columns[2].innerText
        const bidBody = ''
        return { dataHref, bidTitle, bidUnit, releaseTime, bidBody }
      });
    });
    resultList = result
  }

  async function insertBid() {
    const data = resultList.map(item => {
      return {
        bidTitle: item.bidTitle,
        bidBody: item.bidBody,
        bidTable: item.bidTable,
        releaseTime: item.releaseTime,
        bidUnit: item.bidUnit || null,
        bidType: 0, // 政府项目
        pjType: item.pjType || 0,
        bidCity: item.bidCity || null,
        bidContact: item.bidContact || null,
        bidAmount: item.bidAmount || null,
        dataSource: 0, // 机器获取
        dataHref: item.dataHref
      }
    })
    if (data.length) {
      await bid_controller.insertBidItems(data).then(res => {
        if (res.success) {
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
