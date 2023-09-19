import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

// 引入vant
import 'vant/lib/index.css'
// 引入scss配置样式
import '@/styles/main.scss'

const app = createApp(App)

//使用持久化插件
app.use(pinia)
app.use(router)

app.mount('#app')
