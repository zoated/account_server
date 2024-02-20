const fs = require('fs')
const path = require('path')

class UploadController {
    uploadAssetSource = async ctx => {
        console.log(ctx.request, 'ii');  // 上传的文件信息
        console.error(ctx.body, 'xx')
        // 上传单个文件
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = path.join(__dirname, '../static/images/') + `/${file.name}`
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {success: true, data: 'http://' + ctx.request.header.host + `/images/${file.name}`}
    }
}

export default new UploadController()
