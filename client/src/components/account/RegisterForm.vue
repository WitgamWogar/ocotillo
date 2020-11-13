<template>
  <v-form ref="form" @keyup.native.enter="register">
    <v-row>
      <v-col class="py-0">
        <v-text-field
          label="Email Address"
          v-model="user.email"
          dark
          outlined
          color="rgb(11, 95, 75)"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-text-field
          label="First Name"
          v-model="user.first_name"
          dark
          outlined
          color="rgb(11, 95, 75)"
          required
        ></v-text-field>
      </v-col>
      <v-col class="py-0">
        <v-text-field
          label="Last Name"
          v-model="user.last_name"
          dark
          outlined
          color="rgb(11, 95, 75)"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-text-field
          label="Password"
          color="rgb(11, 95, 75)"
          v-model="user.password"
          dark
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col class="py-0">
        <v-text-field
          label="Confirm Password"
          color="rgb(11, 95, 75)"
          v-model="user.password_confirmation"
          dark
          outlined
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-layout justify-space-between>
      <v-btn
        block
        :loading="$network.busy"
        dark
        color="rgb(11, 95, 75)"
        @click="register"
        >Register</v-btn
      >
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.axios
        .post(`auth/register`, this.user)
        .then(response => {
          console.log(response, response.code);
        })
        .catch(response => {
          console.log(response);
        });
    },
  },
};
</script>
