require('dotenv').config()

module.exports = {
    mysql:{
        host:process.env.HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE
    },
    secret: process.env.MY_SECRET,
    wxAppId: process.env.WX_APP_ID,
    wxAppSecret: process.env.WX_APP_SECRET
}