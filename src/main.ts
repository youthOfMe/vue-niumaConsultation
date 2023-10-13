import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

// 引入vant
import 'vant/lib/index.css'
// 引入scss配置样式
import '@/styles/main.scss'

// 引入svg地图进行使用
import 'virtual:svg-icons-register'

const app = createApp(App)

//使用持久化插件
app.use(pinia)
app.use(router)

app.mount('#app')

console.log(import.meta.env.VITE_APP_CALLBACK)
