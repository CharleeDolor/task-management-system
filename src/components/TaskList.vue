<template>
    <div class="taskList">

        <TaskModal v-if="isModalVisible" 
            action="Update"
            :tasks=this.tasks
            :index=this.index
            :isUpdate=true
            @close="closeModal" />

        <h3>All tasks</h3>
        <table>
            <tr>
                <th>Task Name</th>
                <th>Task Deadline</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Action</th>
            </tr>

            <tr 
                v-for="(task, index) in this.tasks"
                v-bind:key="index"
                @click="showModal(index)">

                <td>{{ task.taskName }}</td>
                <td>{{ task.taskDate }}</td>
                <td>{{ task.taskPriority }}</td>
                <td v-if="task.taskStatus">Finished</td>
                <td v-else>Not Finished</td>
                <td v-on:click.stop="">
                    <button @click="deleteTask(index)">
                        Delete
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import TaskModal from '@/components/TaskModal.vue';

export default {

    components: {
        TaskModal
    },

    data() {
        return {
            tasks: this.$tasks,
            isModalVisible: false,
            index: 0
        }
    },

    methods: {

        showModal(index) {
            this.index = index;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },

        deleteTask(index) {
            /**
             * if taskStatus is !false,
             *  this means that this task is not done yet
             *  and will not be able to delete
             */
            if (!this.tasks[index].taskStatus) {
                alert("Task is unfinished");
                return;
            }

            let conf = confirm("Deleting task " + this.tasks[index].taskName + "?");
            if (conf) {
                alert("Task " + this.tasks[index].taskName + " Deleted");
                this.$tasks = this.tasks.splice(index, 1);
            } else {
                alert("Delete cancelled");
            }
        }
    }
}
</script>

<style scoped>
.taskList {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>