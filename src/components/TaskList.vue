<template>
    <!-- Task list container -->
    <div class="taskList">

        <!-- TaskDetails component for updating tasks -->
        <TaskDetails v-if="isModalVisible" action="Update" 
            :tasks=this.tasks
            :index=this.index
            :isUpdate=true
            :isManage="this.isManage" 
        @close="closeModal" />

        <!-- Heading for all tasks -->
        <h2 v-if="(this.tasks.length > 0)">All tasks</h2>

        <!-- Task progress section -->
        <div class="task-progress">
            <h3>Completed Tasks: {{ this.totalCompleted }}</h3>
            <h3>Total Tasks: {{ this.totalTasks }}</h3>
        </div>
        
        <!-- Table wrapper -->
        <div class="table-wrapper">
            <!-- Table displaying tasks -->
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
                    <!-- Iterate over tasks -->
                    <tr v-for="(task, index) in this.tasks" :key="index" @click="showModal(index)">

                        <td>{{ task.taskName }}</td> <!-- Display task name -->
                        <td>{{ task.taskDescription }}</td> <!-- Display task description -->

                        <!-- Display task status -->
                        <td v-if="task.taskStatus">Completed</td>
                        <td v-else>Not Complete</td>

                        <!-- Action column for managing tasks -->
                        <td v-on:click.stop="" v-if="this.isManage">
                            <button @click="deleteTask(index)" class="btn-red ">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    
            <!-- Message if there are no tasks -->
            <h2 v-else>Go to Manage Task and click 'Add Task' button to add a new task</h2>
        </div>
    </div>
</template>

<script>
import TaskDetails from './TaskDetails.vue';

export default {

    components:{
        TaskDetails
    },

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
            // Check if task is completed
            if (this.tasks[index].taskStatus) {
                // Alert if task is completed and cannot be updated
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
            // Check if task is incomplete
            if (!this.tasks[index].taskStatus) {
                // Alert if task is incomplete and cannot be deleted
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
/* Styles for task list */
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

/* Styles for task progress section */
.task-progress h3 {
    text-align: right;
    margin-right: 90px;
}

/* Styles for table wrapper */
.table-wrapper {
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

/* Styles for table */
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
