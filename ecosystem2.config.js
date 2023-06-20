module.exports = {
    // pm2进程管理配置
    apps: [
        {
            name: 'nuxt-ssg-generate',
            script: './service/server.js',
            watch: false,
            autorestart: true,
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            env_production: {
                'PORT': 9012,
                'NODE_ENV': 'production',
                script: 'server.js'
            }
        }
    ]
};
