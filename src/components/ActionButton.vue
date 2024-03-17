<template>
    <button @click="bindAction()">{{ this.action }}</button>
</template>

<script>
export default{
    props: {
        action: {
            required: true,
            type: String
        },

        index: {
            required: true,
            type: Number
        }
    },

    methods: {
        bindAction(
            taskName = null, 
            taskDate = null, 
            taskPriority = null
        )
        {
            console.log(taskName, taskDate, taskPriority)
        }
    }
}
</script>