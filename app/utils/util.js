const formatTime = (date, type = 'date') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  const _time = `${formatNumber(hour)}:${formatNumber(minute)}`
  const _date = `${formatNumber(day)}/${formatNumber(month)}/${formatNumber(year)}`

  return type === 'dateTime' ? _date + ' ' + _time : _date
}

const formatNumber = n => {
  n = n.toString()
  return n.padStart(2,0)
}

const promisify = original => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

const generateExplainText = item => {
  if (item.type === 0) {
    return `上班${item.workingHours}天`
  } else if (item.type === 1) {
    return `上班${item.workingHours}个小时`
  } else if (item.type === 2) {
    return item.costName
  } else {
    return ''
  }
}

module.exports = {
  formatTime,
<<<<<<< Updated upstream
  promisify
}
=======
  promisify,
  generateExplainText
}
>>>>>>> Stashed changes
