module.exports = {
    // pm2进程管理配置
    apps: [
        {
            name: 'nuxt-ssg',
            script: './node_modules/nuxt/bin/nuxt.js',
            watch: false,
            autorestart: true,
            args: 'start',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            env_production: {
                'PORT': 9038,
                'NODE_ENV': 'production',
                script: './node_modules/nuxt/bin/nuxt.js',
                args: 'start'
            }
        }
    ]
};
