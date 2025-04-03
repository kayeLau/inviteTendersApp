const fs = require("fs");
const path = require('path');
const multer = require('multer')

// 配置 multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.headers['user-id'];
        if (!userId) {
            return cb(new Error('缺少用户 ID'));
        }

        const uploadDir = path.join('./files', userId);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true 支持多级目录
        }

        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const date = new Date();
        const dateStr = date.getFullYear() +
            String(date.getMonth() + 1).padStart(2, '0') + // 月份從 0 開始，需 +1
            String(date.getDate()).padStart(2, '0');

        // 獲取用戶文件夾中的文件列表
        const userId = req.headers['user-id'];
        const uploadDir = path.join('./files', userId);

        // 過濾出當天的文件（以日期開頭的文件名）
        let maxSequence = 0;
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir)
                .filter(f => f.startsWith(dateStr)); // 只保留當天的文件

            // 從文件名中提取序號，找到最大值
            files.forEach(file => {
                const sequence = parseInt(file.split('-')[1], 10); // 提取序號部分
                maxSequence = Math.max(sequence,maxSequence)
            });
        }

        const sequence = String(maxSequence + 1).padStart(3, '0');
        req.fileIndex = (req.fileIndex || 1) + 1; // 遞增序號，保存在 req 對象中

        // 保留文件擴展名
        const ext = path.extname(file.originalname);

        // 組合文件名：日期 + 序號 + 擴展名
        const newFilename = `${dateStr}-${sequence}${ext}`;
        cb(null, newFilename);
    }
});

// 创建 multer 实例
export const upload = multer({ storage: storage });
