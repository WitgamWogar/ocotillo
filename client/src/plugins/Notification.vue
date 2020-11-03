<template>
  <v-snackbar v-model="active" :timeout="timeout" :color="color">
    {{ message }}
    <v-btn text @click="active = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'notification',
  data() {
    return {
      active: false,
      message: '',
      timeout: 3000,
      color: '',
    };
  },
  created() {
    let _this = this;
    this.$eventHub.$on('show-notification', function(
      msg = '',
      color = '',
      timeout = 3000,
    ) {
      _this.timeout = timeout;
      _this.color = color;
      _this.message = msg;
      _this.active = true;
    });
  },
};
</script>
