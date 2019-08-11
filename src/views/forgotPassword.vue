<template lang="html">
  <div>
    <section>
      <h3>Forgot your password?</h3>
      <input
        v-model="forgotPasswordinput"
        type="text"
        name=""
        value=""
        @keydown.enter="forgotPassword"
      >
      <button
        type="button"
        name="button"
        @click="forgotPassword"
      >
        Give me a new password
      </button>
      <span>Go back to <router-link :to="{ path: '/login'}">Login</router-link>.</span>
      <span>Create a <router-link :to="{ path: '/sign-up'}">new account</router-link>.</span>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data: () => ({
    forgotPasswordinput: ''
  }),
  methods: {
    forgotPassword: function () {
      firebase.auth().sendPasswordResetEmail(
        this.forgotPasswordinput)
        .then(function () {
          // Password reset email sent.
        })
        .catch(function (error) {
          // Error occurred. Inspect error.code.
          return error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    input {
        display: block;
        background: #FFFFFF;
        border: 1px solid #BDC1CC;
        padding: .5rem;
        margin: 1rem;
    }
}
</style>
