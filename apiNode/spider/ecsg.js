const puppeteer = require('puppeteer');

module.exports = async () => {
  let resultList = []
  const Bud_controller = require('../controllers/bud_controller')
  const bud_controller = new Bud_controller()
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');
  await page.goto('https://ecsg.com.cn/cms/NoticeList.html?id=1-1&typeid=4&word=&seacrhDate=');
  await page.waitForSelector('#noticeListTBody tr')

  await getHref()
  await getContent()
  await insertBud()

  browser.close();

  // methods
  async function getContent() {
    for (let i = 0; i < resultList.length ; i++) {
      await page.goto(resultList[i].data_href);
      await page.waitForSelector('.edit-container > p')
      const result = await page.$eval('.edit-container', row => {
        let text = ''
        const columns = row.querySelectorAll('p');
        columns.forEach(item => {
          text += String(item.innerHTML).replace(/\s*<[^>]*>\s*/g,'')
          text += '|'
        })
        return text
      })
      console.log(result)
      resultList[i].bud_body = result
    }
  }


  async function getHref() {
    const result = await page.$$eval('#noticeListTBody tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        const data_href = row.querySelector('td > a').href
        const bud_title = columns[0].innerText
        const bud_unit = columns[1].innerText
        const release_time = columns[2].innerText
        const bud_body = ''
        return { data_href, bud_title, bud_unit, release_time, bud_body }
      });
    });
    resultList = result
  }

  async function insertBud(){
    const data = resultList.map(item => {
      return {
        bud_title:item.bud_title,
        bud_body:item.bud_body,
        bud_table:item.bud_table,
        release_time:item.release_time,
        bud_unit:item.bud_unit || null,
        bud_type:0, // 政府项目
        pj_type:item.pj_type || 0,
        bud_city:item.bud_city || null,
        bud_contact:item.bud_contact || null,
        bud_amount:item.bud_amount || null,
        data_source:0, // 机器获取
        data_href:item.data_href
      }
    })
    await bud_controller.postInsertBudItems(data).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
};
