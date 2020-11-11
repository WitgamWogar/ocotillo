<template>
  <center>
    <h1>
        {{ message || 'Page not found [404]' }}
    </h1>
        <v-btn color="success" dark class="mt-5">
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

  center {
    margin: 15vw;
  }

  h1 {
    color: var(--border);
    font-size: 2em;
  }

</style>
