<template>
    <div class="taskList">

        <task-model v-if="isModalVisible" action="Update" 
            :tasks=this.tasks
            :index=this.index
            :isUpdate=true
            :isManage="this.isManage" 
        @close="closeModal" />

        <h2 v-if="(this.tasks.length > 0)">All tasks</h2>
        <h3>Completed Tasks: {{ this.totalCompleted }}</h3>
        <h3>Total Tasks: {{ this.totalTasks }}</h3>

        <table v-if="(this.tasks.length > 0)">
            <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Status</th>
                <th v-if="this.isManage">Action</th>
            </tr>

            <tr v-for="(task, index) in this.tasks" :key="index" @click="showModal(index)">

                <td>{{ task.taskName }}</td>
                <td>{{ task.taskDescription }}</td>

                <td v-if="task.taskStatus">Completed</td>
                <td v-else>Not Complete</td>

                <td v-on:click.stop="" v-if="this.isManage">
                    <button @click="deleteTask(index)">
                        Delete
                    </button>
                </td>
            </tr>
        </table>
        <h2 v-else>Go to Manage Task and click 'Add Task' button to add a new task</h2>
    </div>
</template>

<script>

export default {

    props: {
        isManage: {
            type: Boolean
        }
    },

    data() {
        return {
            tasks: this.$tasks,
            isModalVisible: false,
            index: null
        }
    },

    computed: {
        totalCompleted() {
            return this.tasks.filter(task => task.taskStatus == true).length;
        },

        totalTasks() {
            return this.tasks.length;
        }
    },

    beforeMount() {

    },

    methods: {

        showModal(index) {
            /**
            * check if taskStatus is true
            */
            if (this.tasks[index].taskStatus) {
                /**
                 * exit the execution, 
                 * this means that finished tasks cannot be updated
                 */
                alert("Finished tasks cannot be updated.");
                return;
            }
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
        },
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

table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
}

h3{
    margin: 0.2rem
}

tr:not(:first-child):hover {
    background-color: yellowgreen;
    cursor: pointer;
}
</style>