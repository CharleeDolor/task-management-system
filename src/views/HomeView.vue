<template>
  <div class="home">
    <TaskList></TaskList>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'

export default {

  name: 'HomeView',

  components:{
    TaskList
  }
}
</script>
