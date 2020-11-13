<template>
  <div id="login-container" class="page-wrapper">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 elevation-6 mt-n15>
          <v-toolbar class="pt-5" color="rgba(0, 0, 0, 0.90)" dense>
            <v-toolbar-items>
              <v-toolbar-title class="white--text">
                <h4>
                  {{ registerMode ? 'Register' : 'Login' }}
                </h4>
              </v-toolbar-title>
            </v-toolbar-items>
          </v-toolbar>
          <v-card color="rgba(0, 0, 0, 0.90)" tile>
            <v-card-text class="pt-6 pb-2" color="orange">
              <div>
                <LoginForm v-if="!registerMode" />
                <RegisterForm v-else />
                <div class="text-right">
                  <v-btn
                    text
                    color="rgb(11, 95, 75)"
                    @click="registerMode = !registerMode"
                    class="px-0 mt-1"
                  >
                    {{
                      registerMode
                        ? 'Login to an existing account'
                        : 'Register a new account'
                    }}
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../../components/account/LoginForm';
import RegisterForm from '../../components/account/RegisterForm';

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      registerMode: false,
    };
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
