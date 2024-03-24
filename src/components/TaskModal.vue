<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    <h3>{{ this.action }}</h3>
                </slot>
            </header>

            <section class="modal-body" v-if="this.isManage">
                <slot name="body">
                    <input type="text" v-model="taskName" id="txtTaskName" placeholder="Task Name">
                </slot>
            </section>

            <section class="modal-body" v-if="this.isManage">
                <slot name="body">
                    <input type="text" name="taskDescription" placeholder="Task Description" id="taskDescription" v-model="taskDescription">
                </slot>
            </section>

            <footer class="modal-footer" v-if="this.isUpdate && this.isManage == false">
                <slot name="footer">
                    <label for="taskStatus">Status</label>
                    <input type="checkbox" v-model="taskStatus">
                </slot>
            </footer>

            <button type="button" class="btn-green" 
            @click="bindAction()">
                Save
            </button>

            <button type="button" class="btn-red" @click="close">
                Cancel
            </button>
        </div>
    </div>
</template>

<script>
import { String } from 'core-js';

export default {
    name: 'TaskModal',

    props: {
        action: {
            required: true,
            type: String
        },

        index:{
            type: Number
        },

        isUpdate:{
            type: Boolean
        },

        isManage:{
            type: Boolean
        }
    },

    data() {
        return {
            taskName: '',
            taskDate: '',
            taskDescription: '',
            taskStatus: false,
            tasks: this.$tasks,
        }
    },

    beforeMount(){
        if(this.isUpdate){
            this.taskName = this.tasks[this.index].taskName;
            this.taskDescription = this.tasks[this.index].taskDescription;
            this.taskStatus = this.tasks[this.index].taskStatus;
        }
    },

    methods: {
        close() {
            this.$emit('close');
        },

        /**
         * method for binding action based on the value of this.action
         */
        bindAction(){

            /**
             * Check if this.action is Add Task
             *  if true, then modal is in add task mode
             */
            if (this.action === "Add Task") {
                if (this.taskName && this.taskDescription) {

                    let isExist = false;
                    //check if task is already exist
                    this.tasks.forEach(element => {
                        if(element.taskName.toLowerCase() === this.taskName.toLowerCase()){
                            isExist = true;
                        }
                    });

                    if(isExist){
                        alert("Task already exist");
                        return;
                    }
                    
                    this.tasks.push({
                        taskName: this.taskName,
                        taskDescription: this.taskDescription,
                        taskStatus: false
                    });

                    this.$tasks = this.task;

                    alert("Task " + this.taskName + " created");
                    this.taskName = '',
                    this.taskDescription ='',
                    this.close();
                    return;

                } else {

                    alert("Invalid task entry");
                    return;
                }
            }

            /**
             * If this.action === "Update",
             *  this means that modal is in update mode
             */
            if(this.action === "Update"){
                if( this.taskName &&
                    this.taskDescription
                ){
                    this.$tasks[this.index].taskName = this.taskName;
                    this.$tasks[this.index].taskDescription = this.taskDescription;
                    this.$tasks[this.index].taskStatus = this.taskStatus;

                    alert("Updated Successfully");
                    this.close();
                    return;
                }
                
            }
        }
    },
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}

.btn-red {
    color: white;
    background: #e71919;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}

input[type=text] {
    font-size: 1rem;
}

#taskDescription {
    font-size: 1rem;
}
</style>