<template>
  <v-snackbar
    v-model="active"
    :timeout="timeout"
    :color="color"
    :content-class="allowClose || actionBtnRoute ? '' : 'text-center'"
  >
    {{ message }}

    <template v-slot:action="{}">
      <v-btn v-if="allowClose" text @click="active = false">Close</v-btn>
      <v-btn v-if="actionBtnRoute" text @click="performAction">
        {{ actionBtnText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'notification',
  data() {
    return {
      active: false,
      message: '',
      timeout: 500,
      color: '',
      allowClose: false,
      actionBtnText: '',
      actionBtnRoute: '',
    };
  },
  methods: {
    performAction() {
      this.active = false;
      this.$router.push(this.actionBtnRoute);
    },
  },
  created() {
    let _this = this;
    this.$eventHub.$on('show-notification', function(
      msg = '',
      color = '',
      timeout = 5000,
      allowClose = false,
      actionBtnText = '',
      actionBtnRoute = '',
    ) {
      console.log(actionBtnText, actionBtnRoute);
      _this.timeout = timeout;
      _this.color = color;
      _this.message = msg;
      _this.active = true;
      _this.allowClose = allowClose;
      _this.actionBtnText = actionBtnText;
      _this.actionBtnRoute = actionBtnRoute;
    });
  },
};
</script>
