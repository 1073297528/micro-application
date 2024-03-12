import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'
microApp.start({
  plugins: {
    modules: {
      /* 这是<micro-app />中子系统的name */
      'child-app': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              // 这里做的本质就是代理，因为在本地中启动，主系统和子系统的IP一样，但端口不一样，所以转发一下
              code = code.replace(/(from|import)(\s*['"])(\/child-base\/)/g, (all) => {
                return all.replace('/child-base/', 'http://127.0.0.1:4321/child-base/')
              })
            }
            return code
          }
        }
      ]
    }
  }
})
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
