import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$tasks = []
app.config.globalProperties.$isManage = false;

app.use(router).mount('#app')
