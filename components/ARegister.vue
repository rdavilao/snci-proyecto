<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="!!error" :dismissible="true" type="error">{{
            error
          }}</v-alert>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field v-model="firstName" :rules="[rules.required]" label="Nombre" required></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field v-model="lastName" :rules="[rules.required]" label="Apellido" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" :rules="[rules.email]" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="current-password"
            label="Password" @click:append="show = !show"></v-text-field>
        </v-col>
        <v-col>
          <v-file-input v-model="photo" :rules="[rules.photo]" accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload your photo" prepend-icon="mdi-camera" label="Photo"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :disabled="!valid" @click="onSignUp">Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
  
<script>
export default {
  props: {
    error: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    valid: false,
    show: false,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    photo: undefined,
  }),
  computed: {
    rules() {
      return {
        required: (value) => !!value || 'Required',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,20})+$/.test(v) ||
          'Invalid Email',
        photo: (v) =>
          !v || !v.length || v[0].size < 2000000 || 'Photo size should be less than 2 MB!',
      }
    },
  },
  methods: {
    onSignUp() {
      const newUser = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        photo: this.photo[0],
      }
      this.$emit('signUp', newUser)
    },
  },
}
</script>
  
<style scoped></style>