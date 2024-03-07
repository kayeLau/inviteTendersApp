const db = require('./connection_db')
const config = require("../config/development_config")

const sql_tabel = [
    {
        name: 'bid_info',
        sql: `CREATE TABLE bid_info (
            bid_id VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bid_title VARCHAR(50) NOT NULL COMMENT '标题' COLLATE 'utf8mb4_0900_ai_ci',
            bid_body LONGTEXT NULL DEFAULT NULL COMMENT '正文' COLLATE 'utf8mb4_0900_ai_ci',
            bid_table JSON NULL DEFAULT NULL COMMENT '表格',
            release_time DATE NOT NULL COMMENT '发布时间',
            bid_unit VARCHAR(50) NULL DEFAULT NULL COMMENT '招采单位' COLLATE 'utf8mb4_0900_ai_ci',
            bid_type INT(10) NULL DEFAULT NULL COMMENT '招标类型；0：政府项目 1：企业项目',
            pj_type INT(10) NULL DEFAULT NULL COMMENT '项目类型',
            bid_city INT(10) NULL DEFAULT NULL COMMENT '招标城市',
            bid_contact VARCHAR(50) NULL DEFAULT NULL COMMENT '招标联系方式' COLLATE 'utf8mb4_0900_ai_ci',
            bid_amount INT(10) NULL DEFAULT NULL COMMENT '项目金额',
            data_source INT(10) NULL DEFAULT NULL COMMENT '数据来源',
            data_href VARCHAR(200) NULL DEFAULT NULL COMMENT '原文連接' COLLATE 'utf8mb4_0900_ai_ci',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY (bid_id) USING BTREE,
            UNIQUE INDEX bid_title (bid_title) USING BTREE
        )`
    },
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