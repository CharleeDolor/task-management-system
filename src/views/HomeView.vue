<template>
  <div class="home">
    <task-list></task-list>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  methods:{  
    created() {
      console.log(this.$options.components['task-list']);
    }
  }
}
</script>