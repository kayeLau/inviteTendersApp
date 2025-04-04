
const fs = require("fs");
const path = require('path');

module.exports = class File {
    writeFile(req, res, next) {
        if (!req.file) {
            return res.status(400).json({ code: -1, message: '没有上传文件' });
        }

        res.status(200).json({
            success: true,
            message: '上传成功',
            data:{
                filename: req.file.filename,
                size: req.file.size,
                path: req.file.path
            }
        });
    }

    async readFile(req, res, next) {
        try {
            const filename = req.body.filename;
            const userId = req.body.userId;

            // 構建安全的文件路徑
            const userFolder = path.join(__dirname, 'files', userId);
            const filePath = path.join(userFolder, filename);

            // 檢查文件路徑是否在用戶文件夾內（防止路徑穿越攻擊）
            if (!filePath.startsWith(userFolder)) {
                return res.status(403).json({ error: '無權訪問該文件' });
            }

            // 檢查文件是否存在
            try {
                await fs.access(filePath);
            } catch (error) {
                return res.status(404).json({ error: '圖片不存在' });
            }

            // 檢查文件是否為圖片（根據副檔名）
            const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const ext = path.extname(filename).toLowerCase();
            if (!validImageExtensions.includes(ext)) {
                return res.status(400).json({ error: '不支援的文件格式' });
            }

            // 設置適當的 Content-Type
            const contentTypes = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif'
            };

            res.setHeader('Content-Type', contentTypes[ext]);
            // 發送圖片文件
            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(500).json({ error: '圖片發送失敗' });
                }
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: '服務器內部錯誤' });
        }
    }
}