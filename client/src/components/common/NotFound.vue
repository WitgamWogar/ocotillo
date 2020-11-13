<template>
  <center>
    <h1 class="pt-15">
        {{ message || 'Page not found [404]' }}
    </h1>
        <v-btn color="success" dark class="mt-5" @click="$router.push('/')">
            Collections Page
        </v-btn>
  </center>
</template>

<script>

  export default {
      props: [
          'message',
      ]
  }

</script>

<style scoped>
  h1 {
    color: white;
    font-size: 2em;
  }

</style>
