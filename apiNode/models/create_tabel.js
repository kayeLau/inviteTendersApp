const db = require('./connection_db')
const config = require("../config/development_config")

const sql_tabel = [
    {
        name: 'bud_info',
        sql: `CREATE TABLE bud_info (
            bud_id VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bud_title VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bud_body VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bud_table JSON NULL DEFAULT NULL,
            release_time DATETIME NULL DEFAULT NULL,
            bud_unit INT(10) NULL DEFAULT NULL,
            bud_type INT(10) NULL DEFAULT NULL,
            pj_type INT(10) NULL DEFAULT NULL,
            bud_city INT(10) NULL DEFAULT NULL,
            bud_contact VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bud_amount INT(10) NULL DEFAULT NULL,
            data_source INT(10) NULL DEFAULT NULL,
            update_time DATETIME NULL DEFAULT NULL,
            PRIMARY KEY (bud_id) USING BTREE
            )`
    }
]

checkTabel()

function checkTabel() {
    sql_tabel.forEach(item => {
        db.query(`SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = '${config.mysql.database}' AND table_name = '${item.name}'`, (err, result) => {
            if (err) throw err;
            console.log(result)
            if (result[0].count  > 0) {
                console.log(item.name + ' Tabel exists');
            } else {
                createTabel(item)
            }
        });
    })
}

function createTabel(sqlItem) {
    db.query(sqlItem.sql, (err, result) => {
        if (err) throw err;
        console.log(sqlItem.name + ' Table created');
    });
}

module.exports = { checkTabel }