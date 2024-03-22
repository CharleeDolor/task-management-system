<template>
  <div>
    <div>
      <h1>Manage Task</h1> 
      <button type="button" class="btn" @click="showModal">
        Add Task
      </button>
    </div>

    <TaskList :isManage="this.isManage"></TaskList>

    <TaskModal v-show="isModalVisible" action="Add Task" 
      :tasks=this.tasks 
      :isManage="this.isManage"
      @close="closeModal" />
    
  </div>
</template>

<script>
// @ is an alias to /src
import TaskModal from '@/components/TaskModal.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    TaskModal,
    TaskList
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