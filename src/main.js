import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TaskList from '@/components/TaskList.vue'

const app = createApp(App)

app.component('TaskList', TaskList)

app.config.globalProperties.$tasks = []
app.config.globalProperties.$isManage = false;

app.use(router).mount('#app')