const Koa = require('koa')
const { koaBody } = require('koa-body');
const { Nuxt, Generator } = require('nuxt')
const router = require('@koa/router')();
const fs = require('fs');
const path = require('path');
const app = new Koa()
// router.get('/generate', generate)
app.use(koaBody({
    multipart: true  // 开启 multipart/form-data 解析支持，默认 false
}));

router.post('/generate', async (ctx, next) => {
    const { id, project } = ctx.request.body
    try {
        // 创建一个 Nuxt.js 构建器实例
        const config = require('../nuxt.config.js')
        config.dev = false;
        config.generate = {
            routes: [`/${project}/${id}`]
        }
        const nuxt = new Nuxt(config)
        const generator = new Generator(nuxt)
        await generator.generate({ build: false, init: true })
        moveFile();
        ctx.body = { success: true, message: "成功了" };
    } catch (err) {
        ctx.body = { success: false, message: "失败啦" };
        console.log(err);
    }
})

function moveFile() { // 以防止重新生成
    // 1. 获取当前命令所在目录
    const dirPath = process.cwd();

    try {
        // __dirname：返回运行文件所在的目录 E:\dbt\cli-tool\bin
        const dirName = __dirname.split('')
        const resultDirName = dirName.join('')
        // 复制目标文件夹内容，copyDir()方法执行文件夹的拷贝
        copyDir(path.join(resultDirName, 'dist'), path.join(dirPath, 'generate'), (err) => {
            if (err) {
                console.log('模板下载失败')
            }
        })

    } catch (err) {
        console.log(err)
    }
}

function copyDir(src, dist, callback) {
    fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            try {
                const paths = fs.readdirSync(src)
                paths.forEach(function (path) {
                    const _src = src + '/' + path;
                    const _dist = dist + '/' + path;
                    fs.stat(_src, function (err, stat) {
                        if (err) {
                            callback(err);
                        } else {
                            // 判断是文件还是目录
                            if (stat.isFile()) {
                                fs.writeFileSync(_dist, fs.readFileSync(_src));
                            } else if (stat.isDirectory()) {
                                // 当是目录是，递归复制
                                copyDir(_src, _dist, callback)
                            }
                        }
                    })
                })
            } catch (e) {
                callback(e)
            }
        }
    }
}

app.use(router.routes()).use(router.allowedMethods());;
app.listen(9012);
console.log('listening on port 9012');
