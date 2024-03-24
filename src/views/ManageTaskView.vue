<template>
  <div>
    <div>
      <h1>Manage Task</h1> 
      <button type="button" class="btn-green" @click="showModal">
        Add Task
      </button>
    </div>

    <task-list :isManage="this.isManage"/>

    <TaskDetails v-show="isModalVisible" action="Add Task" 
      :tasks=this.tasks 
      :isManage="this.isManage"
      @close="closeModal" />
    
  </div>
</template>

<script>
import TaskDetails from '@/components/TaskDetails.vue';

export default {
  components:{
    TaskDetails
  },

  data() {
    return {
      isModalVisible: false,
      tasks: this.$tasks,
      isManage: false
    }
  },

  beforeMount(){
    this.isManage = true;
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  }
}
</script>