

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
}