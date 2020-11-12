<template>
  <div id="login-container" class="page-wrapper">
    <v-container fluid fill-height class="loginOverlay">
      <v-fade-transition>
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm4 elevation-6 mt-n15>
            <v-toolbar class="pt-5" color="rgba(0, 0, 0, 0.90)">
              <v-toolbar-items>
                <v-toolbar-title class="white--text">
                  <h4>Login</h4>
                </v-toolbar-title>
              </v-toolbar-items>
            </v-toolbar>
            <v-card color="rgba(0, 0, 0, 0.90)" tile>
              <v-card-text class="pt-6" color="orange">
                <div>
                  <LoginForm />
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-fade-transition>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../../components/login/LoginForm';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
#login-container {
  display: flex;
  align-items: center;
  background-image: url('../../assets/login-background.jpeg');
}
</style>
