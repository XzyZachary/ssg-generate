
整体框架的搭建：

    1. 后台管理系统： vue + koa + mongodb
        - 项目管理： 根据项目可以生成不同的模版，不同的页面
        - 静态文档： 添加不同的页面内容，选择对应的模版，添加相关的文档内容或者说明
    2. 预览平台： vue + nuxt
        nuxt为底层基建，根据后台提供的API生成 /_project/_id 的预览页面
    3. 中间层（BFF）： koa
        node层  基于预览平台的框架，利用node层调用nuxt的generator生成/_project/_id的静态HTML页面


这里主要下生成的逻辑，预览平台的其实就可以把它当做一个独立的系统，核心的目录如下：
```plain
├── components               # 组件库
├── pages                    # 路径页面
│   ├── _project             # 动态项目
│   ├── _id.vue              # 动态ID
```
_id.vue文件内容如下：

```javascript
<template>
    <component :is="template" :content="content"></component>
</template>
<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, error, store, params }) {
    const _rest = await $axios.get(`api地址);
    if (_rest.data.code == 200) {
      return {
          template: 'xxxxx', // 默认配置（调取组件组的组件名）
          ..._rest.data.data
      };
    } else {
      error({
        statusCode: 500,
        message: '内部服务器错误'
      });
    }
  },
}
</script>
```

根据上面一套配置过后，我们就可以把相关路径植入到后台管理系统中，就实现了一个简单预览平台

预览完成过后我们就得考虑如何进行动态生成页面，扩展上面的文件目录：

```plain
├── components               # 组件库
├── pages                    # 路径页面
│   ├── _project             # 动态项目
│   ├── _id.vue              # 动态ID
├── services                 # BFF
│   ├── service.js           # 生成服务
```

核心代码如下：就是调用了nuxt实例抛出的generator函数进行build

```javascript
router.post('/generate', async (ctx, next) => {
    const { id, project } = ctx.request.body
    try {
        // 创建一个 Nuxt.js 构建器实例
        const config = require('./nuxt.config.js')
        config.dev = false;
        config.generate = {
            routes: [`/${project}/${id}`]
        }
        const nuxt = new Nuxt(config)
        const generator = new Generator(nuxt)
        await generator.generate({ build: false, init: true })
        // moveFile();
        ctx.body = { success: true, message: "成功" };
    } catch (err) {
        ctx.body = { success: false, message: "失败" };
        console.log(err);
    }
})
```