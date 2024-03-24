import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import TaskDetails from './components/TaskDetails.vue';
import TaskList from './components/TaskList.vue';

const app = createApp(App)

app.component('task-details', TaskDetails);
app.component('task-list', TaskList);

app.config.globalProperties.$tasks = []
app.config.globalProperties.$isManage = false;

app.use(router).mount('#app')
