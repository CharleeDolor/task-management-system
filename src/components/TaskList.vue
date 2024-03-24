<template>
    <div class="taskList">

        <task-details v-if="isModalVisible" action="Update" 
            :tasks=this.tasks
            :index=this.index
            :isUpdate=true
            :isManage="this.isManage" 
        @close="closeModal" />

        <h2 v-if="(this.tasks.length > 0)">All tasks</h2>

        <div class="task-progress">
            <h3>Completed Tasks: {{ this.totalCompleted }}</h3>
            <h3>Total Tasks: {{ this.totalTasks }}</h3>
        </div>
        
        <div class="table-wrapper">
            <table v-if="(this.tasks.length > 0)" class="fl-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Status</th>
                        <th v-if="this.isManage">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(task, index) in this.tasks" :key="index" @click="showModal(index)">

                        <td>{{ task.taskName }}</td>
                        <td>{{ task.taskDescription }}</td>

                        <td v-if="task.taskStatus">Completed</td>
                        <td v-else>Not Complete</td>

                        <td v-on:click.stop="" v-if="this.isManage">
                            <button @click="deleteTask(index)" class="btn-red ">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    
            <h2 v-else>Go to Manage Task and click 'Add Task' button to add a new task</h2>
        </div>
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
        totalTasks() {
            return this.tasks.length;
        },

        totalCompleted() {
            return this.tasks.filter(task => task.taskStatus == true).length;
        },
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
    flex-direction: column;
}

h3{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.task-progress h3 {
    text-align: right;
    margin-right: 90px;
}

.table-wrapper {
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table tbody tr:hover {
    background-color: yellowgreen;
    cursor: pointer;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}


</style>