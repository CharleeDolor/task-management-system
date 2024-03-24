<template>
  <div>
    <div>
      <h1>Manage Task</h1> 
      <button type="button" class="btn" @click="showModal">
        Add Task
      </button>
    </div>

    <task-list :isManage="this.isManage"/>

    <task-details v-show="isModalVisible" action="Add Task" 
      :tasks=this.tasks 
      :isManage="this.isManage"
      @close="closeModal" />
    
  </div>
</template>

<script>

export default {
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