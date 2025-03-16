const checkNull = (data) => {
    for (var key in data) {
        // 不為空
        return false;
    }
    // 為空值
    return true;
}

const fillZero = (value) => {
    return Number(value) > 9 ? String(value) : '0' + value
}

const getCurrentTime = () => {
    const date = new Date()
    const yy = date.getFullYear()
    const mm = fillZero(date.getMonth() + 1)
    const dd = fillZero(date.getDate())
    const h = fillZero(date.getHours())
    const m = fillZero(date.getMinutes())
    const s = fillZero(date.getSeconds())
    return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
}

module.exports = { getCurrentTime , checkNull}