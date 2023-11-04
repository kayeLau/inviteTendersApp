const db = require('./connection_db')
const config = require("../config/development_config")

const sql_tabel = [
    {
        name: 'bud_info',
        sql: `CREATE TABLE bud_info (
            bud_id VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
            bud_title VARCHAR(50) NULL DEFAULT NULL COMMENT '标题' COLLATE 'utf8mb4_0900_ai_ci',
            bud_body VARCHAR(255) NULL DEFAULT NULL COMMENT '正文' COLLATE 'utf8mb4_0900_ai_ci',
            bud_table JSON NULL DEFAULT NULL COMMENT '表格',
            release_time DATETIME NULL DEFAULT NULL COMMENT '发布时间',
            bud_unit VARCHAR(50) NULL DEFAULT NULL COMMENT '招采单位',
            bud_type INT(10) NULL DEFAULT NULL COMMENT '招标类型；0：政府项目 1：企业项目',
            pj_type INT(10) NULL DEFAULT NULL COMMENT '项目类型',
            bud_city INT(10) NULL DEFAULT NULL COMMENT '招标城市',
            bud_contact VARCHAR(50) NULL DEFAULT NULL COMMENT '招标联系方式' COLLATE 'utf8mb4_0900_ai_ci',
            bud_amount INT(10) NULL DEFAULT NULL COMMENT '项目金额',
            data_source INT(10) NULL DEFAULT NULL COMMENT '数据来源',
            data_href VARCHAR(50) NULL DEFAULT NULL COMMENT '原文連接' COLLATE 'utf8mb4_0900_ai_ci',
            update_time DATETIME NULL DEFAULT NULL COMMENT '更新时间',
            PRIMARY KEY (bud_id) USING BTREE,
            UNIQUE INDEX bud_title (bud_title) USING BTREE
        )`
    },
    {
        name: 'user_info',
        sql: `CREATE TABLE user_info (
            open_Id VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
            session_key VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
            PRIMARY KEY (open_Id) USING BTREE
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