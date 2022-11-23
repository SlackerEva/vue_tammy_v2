<template>
  <!--min-height: 100%; font for all; box-sizing: border-box;-->
  <div class="min-h-full font-Poppins box-border">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
  import Nav from '@/components/Nav-bar.vue';
  export default {
    name: 'App',
    components: {
      Nav,
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
