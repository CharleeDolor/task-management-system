import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import TaskModal from './components/TaskModal.vue';
import TaskList from './components/TaskList.vue';

const app = createApp(App)


app.component('task-model', TaskModal);
app.component('task-list', TaskList);


app.config.globalProperties.$tasks = []
app.config.globalProperties.$isManage = false;


app.use(router).mount('#app')


console.log(app.component('task-model'));
console.log(app.component('task-list'));
