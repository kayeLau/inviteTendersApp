

(async() => {
    const intervalTime = 1000 * 60 * 60
    const scriptAbleHour = '08'
    const ecsg = require('./ecsg')
    // ecsg()
    
    function isScriptAble(){
        let time = new Date
        let hour = time.getHours()
        return hour === scriptAbleHour ? true : false
    }


    setInterval(() => {
        if(isScriptAble){
            ecsg()
        }
    },intervalTime)
})();
