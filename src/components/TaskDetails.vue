<template>
    <div>
        <h2>Task Details</h2>
        <div>
            <p>Task Title: {{ this.item.taskName }}</p>
            <p>Task Description: {{ this.item.taskDescription }}</p>
            <p v-if="(this.item.taskStatus)">Task Status: Completed</p>
            <p v-else>Task Status: Ongoing</p>
        </div>

    </div>
</template>

<script>
export default{
    props:{
        index: {
            required: true,
            type: Number
        },
        item: {
            required: true,
            type: Object
        }
    }
}
</script>