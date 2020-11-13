<template>
  <v-form ref="form" @keyup.native.enter="login">
    <v-alert v-if="loginError" dense type="error"
      >These credentials don't match our records.</v-alert>
    <v-text-field
      label="Email Address"
      v-model="user.username"
      dark
      ref="emailField"
      :error="loginError"
      @click="loginError = false"
      outlined
      color="rgb(11, 95, 75)"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      color="rgb(11, 95, 75)"
      @click="loginError = false"
      v-model="user.password"
      dark
      :error="loginError"
      outlined
      :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      :type="showPass ? 'text' : 'password'"
      @click:append="showPass = !showPass"
      required
    ></v-text-field>
    <v-layout justify-space-between class="mt-3">
      <v-btn
        block
        :loading="$network.busy"
        dark
        color="rgb(11, 95, 75)"
        @click="login"
        >Login</v-btn
      >
      
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      showPass: false,
      loginError: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.loginError = false;
      this.axios
        .post(`auth/login`, this.user)
        .then(response => {
          console.log(response, response.code);
        })
        .catch(() => {
          //TODO make this more robust handling all types of errors
          this.loginError = true;
        });
    },
  },
};
</script>
