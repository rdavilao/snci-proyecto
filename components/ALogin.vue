<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="!!error" :dismissible="true" type="error">{{
            error
          }}</v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field          
            v-model="email"
            :append-icon="'mdi-account'"
            :rules="[rules.email]"
            label="E-mail"       
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="current-password"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col v-if="!signUpOpt" cols="12" md="6">
          <v-text-field          
            v-model="text"
            label="Name"       
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="!signUpOpt" cols="12" md="6">
          <v-text-field          
            v-model="text"
            label="Last Name"       
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="!signUpOpt" cols="12" md="6">
          <v-file-input label="Upload your photo"></v-file-input>
        </v-col>                        
        <v-col v-if="signUpOpt">
          <v-btn :disabled="!valid" @click="onSignIn">Sign in</v-btn>
        </v-col>
        <v-col v-if="signUpOpt">
          <v-btn @click="onSignUp">Sign Up</v-btn>
        </v-col>        
      </v-row>
      <v-row>
        <v-col v-if="!signUpOpt">
          <v-btn @click="signUpOpt = true">Back</v-btn>
        </v-col>
        <v-col v-if="!signUpOpt">
          <v-btn :disabled="!valid" @click="onSignIn">Sign Up</v-btn>
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
    signUpOpt: true,
    email: '',
    password: '',
    confirmPwd: ''
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
      }
    },
  },
  methods: {
    onSignIn() {
      this.$emit('signIn', { email: this.email, password: this.password })
    },
    onSignUp() {      
      this.signUpOpt = false; 
      // this.$emit('signUp', { email: this.email, password: this.password })
    },
  },
}
</script>

<style scoped></style>
