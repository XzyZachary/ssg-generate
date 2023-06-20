const { resolve } = require('path');
const path = require('path');

// nuxt配置
module.exports = {
    alias: {}, // 别名
    head: {
        title: '',
        meta: [
          { name: 'Content-Type', content: 'text/html; charset=utf-8' },
          { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover' },
          { name: 'format-detection', content: 'telephone=no,email=no'},
          { name: 'wap-font-scale', content: 'no'},
          { hid: 'description', name: 'description', content: '' },
          { hid: 'keywords', name: 'keywords', content: '' }
        ],
        // script: [
        //     {
        //         src: './flexible/flexible.js',
        //         type: 'text/javascript',
        //         charset: 'utf-8'
        //     }
        // ]
    }, // 默认头部seo dns-prefetch等
    generate: {}, // 生产静态文件
    /*
   ** Build configuration
   */
    build: { // 打包优化
        // 根据项目重新定义 区分build环境 和 本地dev环境
        // process.env.NODE_ENV == 'production' ? 'cdn url' : 
        publicPath: '/_nuxt/',
        productionSourceMap: true,
        transpile: [/vant.*?less/],
        babel: {
            plugins: [
                ...(process.env.NODE_ENV == 'production' ? ['transform-remove-console'] : [])
            ]
        },
        postcss: {
            plugins: {
                'postcss-pxtorem': {
                    rootValue: 75, // 根据ui根字体大小
                    propList: ['*'],
                    exclude: /(docs)|(github\-markdown)/
                }
            }
        },
        analyze: process.argv.join('').includes('analyze'), // 打包分析
        maxChunkSize: 360000,
        extractCSS: true, // 单独打包css
        optimization: {
            splitChunks: {
                cacheGroups: { // 分开打包
                    expansions: {
                        name: 'expansions',
                        test(module) {
                            return /swiper|lazyload/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 10
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        // plugins: [
        //     // ...
        //     new SentryWebpackPlugin({
        //         include: '.',
        //         release: process.env.VUE_APP_RELEASE_VERSION, // 一致的版本号
        //         configFile: 'sentry.properties', // 不用改
        //         ignore: ['node_modules', 'nuxt.config.js'],
        //         urlPrefix: '~/',
        //         // ignoreFile: '.sentrycliignore',
        //         deleteAfterCompile: true
        //     })
        // ]
        extend(config, ctx) {
            config.module.rules.push(
                {
                    test: /\.m?js$/,
                    include: [
                        resolve('node_modules')
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            );
            config.module.rules.push(
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
                            modifyVars: {
                                // 这里引入刚才新建的less文件，检查路径引入有没有问题
                                // hack: `true; @import "${resolve(
                                //     './assets/style/include/vant-var.less'
                                // )}";`
                            }
                        }
                    }]
                }
            );
            // assets images build过后按照文件夹划分，之前是都在一个目录下所有的图片
            ctx.loaders.imgUrl.name = 'img/[path][name].[hash:7].[ext]';
            ctx.loaders.imgUrl.context = path.resolve(__dirname, 'assets/images');
        }
    },
    env: {
        NODE_ENV: process.env.NODE_ENV // 全局环境变量
    },
    telemetry: false,
    server: {
        host: '0.0.0.0', // 默认localhost,
        port: 9038
    },
    css: ['./assets/style/reset.scss'],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],
    modules: [
        // '@nuxtjs/pwa', // pwa + sw + workbox
        '@nuxtjs/style-resources', // css转译
        '@nuxtjs/axios', // 接口
        '@nuxtjs/proxy' // 代理
    ],
    axios: {
        proxy: true,
        prefix: '',
        credentials: true
    },
    proxy: { },
    // ~/components/global目录下的组件将被默认注册为全局组件
    components: ['~/components/global']
};