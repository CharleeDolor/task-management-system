<template>
  <div>
    <div>
      <h1>Manage Task</h1> 
      <button type="button" class="btn" @click="showModal">
        Add Task
      </button>
    </div>


    <TaskModal v-show="isModalVisible" action="Add Task" :tasks=this.tasks @close="closeModal" />
    <TaskList :isManage=true></TaskList>
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
    }
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